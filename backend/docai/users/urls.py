from django.urls import path
# urls.py
from .views import RegisterView, UserView, ChangePasswordView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('user/', UserView.as_view(), name='user'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
]
