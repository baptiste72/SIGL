from . import *

SECRET_KEY = "97c4!rh&nner038oh)d&*o*by@=(#mgw4iy5(flk#2@eg-r#+f"

DEBUG = False

ALLOWED_HOSTS = ["projet-sigl.fr"]

CORS_ORIGIN_WHITELIST = ("https://projet-sigl.fr",)

MICROSOFT_GRAPH = {
    "CLIENT_ID": "854f7701-37b3-4832-95cb-3cafbb2daa8b",
    "CLIENT_SECRET": "_tb8Q~a4QvopZs_EwbFITPftfTKMzIorRvUaYcFE",
    "TENANT_ID": "4d7ad159-1265-437a-b9f6-2946247d5bf9",
    "AUTH_TENANT": "common",
    "GRAPH_USER_SCOPES": "User.Read Mail.Read Mail.Send",
    "WEB_FORMATTED_GRAPH_USER_SCOPES": "User.Read+Mail.Read+Mail.Send",
    "REDIRECT": "https://projet-sigl.fr",
}
