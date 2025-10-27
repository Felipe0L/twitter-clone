import pytest
from twitterback.serializers.post_serializer import PostSerializer
from twitterback.tests.factories import PostFactory
from twitterback.tests.factories import CustomUserFactory
from twitterback.models import Post

pytestmark = pytest.mark.django_db

def test_post_serializer_data():
    post = PostFactory()
    serializer = PostSerializer(post)
    data = serializer.data

    assert data["id"] == post.id
    assert data["content"] == post.content
    assert data["user"] == str(post.user)  # StringRelatedField retorna __str__ do user
    assert "created_on" in data
    assert "updated_on" in data

def test_post_serializer_create_with_context_user():
    user = CustomUserFactory()
    data = {
        "content": "Conteúdo de teste",
    }

    # Como o campo user é read-only, passamos o user via context
    serializer = PostSerializer(data=data, context={"request_user": user})
    assert serializer.is_valid(), serializer.errors

    # Definimos o user manualmente antes de salvar
    post = serializer.save(user=user)
    assert isinstance(post, Post)
    assert post.user == user
    assert post.content == data["content"]
