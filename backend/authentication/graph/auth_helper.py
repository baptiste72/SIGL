import msal

from django.conf import settings

settings = settings.MICROSOFT_GRAPH

def load_cache(request):
  # Check for a token cache in the session
  cache = msal.SerializableTokenCache()
  if request.session.get('token_cache'):
    cache.deserialize(request.session['token_cache'])
  return cache

def save_cache(request, cache):
  # If cache has changed, persist back to session
  if cache.has_state_changed:
    request.session['token_cache'] = cache.serialize()

def get_msal_app(cache=None):
  # Initialize the MSAL confidential client
  auth_app = msal.ConfidentialClientApplication(
    settings['CLIENT_ID'],
    authority="https://login.microsoftonline.com/organizations",
    client_credential=settings['CLIENT_SECRET'],
    token_cache=cache)
  return auth_app

# Method to generate a sign-in flow
def get_sign_in_flow():
  auth_app = get_msal_app()
  return auth_app.initiate_auth_code_flow(
    settings['GRAPH_USER_SCOPES'].split(' '),
    redirect_uri=settings['REDIRECT'])

# Method to exchange auth code for access token
def get_token_from_code(request):
  cache = load_cache(request)
  auth_app = get_msal_app(cache)

  # Get the flow saved in session
  flow = request.data
  result = auth_app.acquire_token_by_auth_code_flow(flow, request.data['GET'])
  save_cache(request, cache)

  return result

def get_token(request):
  cache = load_cache(request)
  auth_app = get_msal_app(cache)

  accounts = auth_app.get_accounts()
  if accounts:
    result = auth_app.acquire_token_silent(
      settings['GRAPH_USER_SCOPES'],
      account=accounts[0])
    save_cache(request, cache)

    return result['access_token']

def remove_user_and_token(request):
  if 'token_cache' in request.session:
    del request.session['token_cache']

  if 'user' in request.session:
    del request.session['user']