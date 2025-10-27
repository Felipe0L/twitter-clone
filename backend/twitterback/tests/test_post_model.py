import pytest
from twitterback.tests.factories import PostFactory

@pytest.mark.django_db

def test_post_creation():
    post = PostFactory()
    assert post.content != ""
    assert post.user is not None
    assert post.created_on is not None