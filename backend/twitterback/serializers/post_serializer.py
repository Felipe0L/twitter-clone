# twitterback/serializers/post_serializer.py
from rest_framework import serializers
from twitterback.models.post import Post
from twitterback.serializers.customuser_serializer import CustomUserSerializer
from twitterback.serializers.comment_serializer import CommentSerializer  # importa

class PostSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    is_owner = serializers.SerializerMethodField()
    author = CustomUserSerializer(read_only=True, source="user")
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    liked_by_me = serializers.SerializerMethodField()
    comments = CommentSerializer(many=True, read_only=True)  # 🔥 adiciona aqui

    class Meta:
        model = Post
        fields = [
            "id",
            "content",
            "user",
            "author",
            "is_owner",
            "likes_count",
            "comments_count",
            "liked_by_me",
            "created_on",
            "updated_on",
            "comments",  # inclui na resposta
        ]

    def get_fields(self):
        fields = super().get_fields()
        # Garante que o contexto (com o request) seja repassado ao CommentSerializer
        if "comments" in fields and hasattr(fields["comments"], 'child'):
            fields["comments"].child.context.update(self.context)
        return fields



    def get_is_owner(self, obj):
        return self.context["request"].user == obj.user

    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()

    def get_liked_by_me(self, obj):
        user = self.context["request"].user
        if not user.is_authenticated:
            return False
        return obj.likes.filter(user=user).exists()

