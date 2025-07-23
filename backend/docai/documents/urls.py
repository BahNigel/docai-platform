from django.urls import path
from .views import CategoryListCreateView, DocumentListCreateView, DocumentRetrieveView

urlpatterns = [
    path('categories/', CategoryListCreateView.as_view()),
    path('documents/', DocumentListCreateView.as_view()),
    path('documents/<int:id>/', DocumentRetrieveView.as_view(), name='document-detail'),
]
