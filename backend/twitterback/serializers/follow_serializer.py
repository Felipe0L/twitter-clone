# twitterback/serializers/follow_serializer.py
from rest_framework import serializers
from twitterback.models.follow import Follow

class FollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Follow
        fields = ['id', 'follower', 'following', 'created_at']
