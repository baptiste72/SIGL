from rest_framework.test import APITestCase
from rest_framework.test import APIClient
from rest_framework import status
from authentication.views import LoginView
from base.models import User
from django.urls import reverse

class LoginViewTestCase(APITestCase):
    def setUp(self):
        # create a user
        self.user = User.objects.create(
            id=1, first_name="Simon", last_name="Menard", email="test@example.com", password="",
        )
        # create a client to make HTTP requests
        self.client = APIClient()

    def test_post_with_valid_credentials(self):
        # send a POST request to the LoginView with valid credentials

        """
        response = self.client.login(
            email="test@example.com", password="password",
        )
        """

        response = self.client.post(
            '/login',
            {"email": "test@example.com", "password": "",},
        )

        user = User.objects.all()[0].email
        # assert that the response has a 200 OK status code
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # get the user from the database and check that their token was updated
        user = User.objects.get(email="test@example.com")
        self.assertIsNotNone(user.token)

    """
    def test_post_with_invalid_credentials(self):
        # send a POST request to the LoginView with invalid credentials
        response = self.client.post(
            "/login/",
            {"email": "test@example.com", "password": "wrong_password"},
        )
    """