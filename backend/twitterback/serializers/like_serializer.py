# twitterback/serializers/like_serializer.py
from rest_framework import serializers
from twitterback.models.like import Like

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Like
        fields = ["id", "user", "post", "created_at"]
        read_only_fields = ["user", "created_at"]
