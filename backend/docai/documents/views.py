from rest_framework import generics
from .models import Category, Document
from .serializers import CategorySerializer, DocumentSerializer

class CategoryListCreateView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class DocumentListCreateView(generics.ListCreateAPIView):
    queryset = Document.objects.all().order_by('-created_at')
    serializer_class = DocumentSerializer

# This handles GET /documents/<id>/
class DocumentRetrieveView(generics.RetrieveDestroyAPIView):
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    lookup_field = 'id'  # or 'pk' if you're using default