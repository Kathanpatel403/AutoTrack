from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from .serializers import UserRegistrationSerializer
from django.contrib.auth import get_user_model


User = get_user_model()


class ListUsersView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = User.objects.all()
        serializer = UserRegistrationSerializer(users, many=True)
        return Response(serializer.data)



