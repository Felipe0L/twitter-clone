import pytest
from twitterback.serializers.customuser_serializer import CustomUserSerializer
from twitterback.tests.factories import CustomUserFactory

pytestmark = pytest.mark.django_db

def test_customuser_serializer_data():
    user = CustomUserFactory(username="testuser")
    serializer = CustomUserSerializer(user)
    data = serializer.data

    assert data["username"] == "testuser"
    assert "password" not in data  # senha não deve ser retornada na resposta

def test_customuser_serializer_create():
    data = {
        "username": "newuser",
        "password": "strongpassword123"
    }

    serializer = CustomUserSerializer(data=data)
    assert serializer.is_valid(), serializer.errors
    user = serializer.save()

    assert user.username == "newuser"
    assert user.check_password("strongpassword123")  # verifica se senha foi salva corretamente
