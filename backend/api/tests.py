from urllib import response
from rest_framework.test import APITestCase
from rest_framework import status
from api.models import Folder, User
from rest_framework.test import APIClient


user = User.objects.get(username='root')
client = APIClient(enforce_csrf_checks=True)
client.force_authenticate(user=user)

class UserTestCase(APITestCase):
	"""
        Ensure we can CRUD actions on user.
    """
	def test_create_user(self):
		url = '/api/v1/register/'
		data = {'username': 'testusername', 'email': "test@test.co", 'password': 'passtest'}
		response = self.client.post(url, data, format = 'json')
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(User.objects.count(), 1)
		self.assertEqual(User.objects.get().username, 'testusername')

	def test_login_user(self):
		# Use of create user test function to get one user into db
		UserTestCase.test_create_user(self)
		url = '/api/v1/jwt/create/'
		data = {'name': '','username': 'testusername', 'password': 'passtest'}
		response = self.client.post(url, data, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK)

	def test_get_user(self):
		url = '/api/v1/users/me/'
		response = self.client.get(url)
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertEqual(response.data, {'username': 'testusername', 'email': "test@test.co", "password": "passtest"})

	def test_delete_user(self):
		url = '/api/v1/users/me/'
		data = {'current_password': 'passtest'}
		response = self.client.delete(url,data,format='json')
		self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


