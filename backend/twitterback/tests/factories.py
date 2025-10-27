import factory
from django.contrib.auth import get_user_model
from twitterback.models.post import Post


User = get_user_model()

class CustomUserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Sequence(lambda n: f"user{n}")
    password = factory.PostGenerationMethodCall("set_password", "123456")

class PostFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Post

    user = factory.SubFactory(CustomUserFactory)
    content = factory.Faker("paragraph")
    created_on = factory.Faker("date_time_this_year")
    updated_on = factory.LazyAttribute(lambda o: o.created_on)