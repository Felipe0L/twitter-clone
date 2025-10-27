from rest_framework import serializers
from django.contrib.auth import get_user_model
from twitterback.models.follow import Follow

User = get_user_model()


class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    avatar = serializers.ImageField(required=False, use_url=True, allow_null=True)
    handle = serializers.SerializerMethodField()
    is_me = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'handle',
            'password',
            'avatar',
            'is_me',
            'is_following',
            'followers_count',
            'following_count',
        ]

    def get_handle(self, obj):
        return obj.username

    def get_is_me(self, obj):
        request = self.context.get("request")
        return request and request.user.is_authenticated and obj.id == request.user.id

    def get_is_following(self, obj):
        request = self.context.get("request")
        if not request or not request.user.is_authenticated:
            return False
        return Follow.objects.filter(follower=request.user, following=obj).exists()

    def get_followers_count(self, obj):
        # Quantos usuários seguem este usuário
        return Follow.objects.filter(following=obj).count()

    def get_following_count(self, obj):
        # Quantos usuários este usuário segue
        return Follow.objects.filter(follower=obj).count()

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = User(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user
