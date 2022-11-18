from azure.identity import InteractiveBrowserCredential, ClientSecretCredential
from msgraph.core import GraphClient
from django.conf import settings

# FIXME: Voir si le transformer ou le supprimer 

class Graph:
    settings
    browser_credential: InteractiveBrowserCredential
    user_client: GraphClient
    client_credential: ClientSecretCredential
    app_client: GraphClient

    def __init__(self):
        self.settings = settings.MICROSOFT_GRAPH
        client_id = self.settings['CLIENT_ID']
        tenant_id = self.settings['TENANT_ID']
        graph_scopes = self.settings['GRAPH_USER_SCOPES'].split(' ')

        # Choses à faire : 
        # 1. Demander un code d'autorisation
        #   Redirige vers une page web : 
        web_url = "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize?client_id=" + self.settings['CLIENT_ID'] + "&response_type=code&redirect_uri=http%3A%2F%2Flocalhost/&response_mode=query&scope=" + self.settings['WEB_FORMATTED_GRAPH_USER_SCOPES'] + "&state=12345"

        print(web_url)

        # TODO: à remplacer car ne sera pas adapter à un fonctionnement sur serveur
        self.browser_credential = InteractiveBrowserCredential(client_id=client_id)

        # TODO: Modifier cela pour redireger les utilisateurs vers une page microsoft
        # self.device_code_credential = DeviceCodeCredential(client_id, tenant_id = tenant_id)
        # self.authorization_code_credentials = AuthorizationCodeCredential(client_id, tenant_id = tenant_id)
        self.user_client = GraphClient(credential=self.browser_credential, scopes=graph_scopes)

    def get_user_token(self):
        graph_scopes = self.settings['GRAPH_USER_SCOPES']
        access_token = self.browser_credential.get_token(graph_scopes)
        return access_token.token

    def get_user(self):
        endpoint = '/me'
        # Only request specific properties
        select = 'displayName,mail,userPrincipalName'
        request_url = f'{endpoint}?$select={select}'

        # FIXME: Ajouter un client_assertion ou client_secret à la requête
        # Se référer à la doc : https://learn.microsoft.com/en-us/azure/active-directory/develop/v2-oauth2-auth-code-flow
        # Et https://learn.microsoft.com/en-us/graph/auth-v2-user
        user_response = self.user_client.get(request_url)
        return user_response.json()