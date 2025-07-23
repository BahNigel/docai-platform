from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer
    

class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        print("Validation errors:", serializer.errors)  # 👈 Add this line
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        password = request.data.get("password")
        if not password:
            return Response({"error": "Password is required"}, status=400)

        try:
            validate_password(password)
        except Exception as e:
            return Response({"error": str(e)}, status=400)

        user = request.user
        user.set_password(password)
        user.save()
        return Response({"success": "Password updated successfully"})