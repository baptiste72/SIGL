from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view as swagger_get_schema_view

SchemaView = swagger_get_schema_view(
    openapi.Info(
        title="Posts API",
        default_version="1.0.0",
        description="API documentation of App",
    ),
    public=True,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("auth/", include("authentication.urls")),
    path(
        "api/v1/",
        include(
            [
                path("", include("api.urls")),
                path(
                    "swagger/schema/",
                    SchemaView.with_ui("swagger", cache_timeout=0),
                    name="swagger-schema",
                ),
            ]
        ),
    ),
]
