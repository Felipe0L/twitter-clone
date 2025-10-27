import pytest
from twitterback.tests.factories import CustomUserFactory

@pytest.mark.django_db

def test_custom_user_creation():
    user = CustomUserFactory(username="testuser")
    assert user.username == "testuser"
    assert user.check_password("123456")  # senha definida na factory