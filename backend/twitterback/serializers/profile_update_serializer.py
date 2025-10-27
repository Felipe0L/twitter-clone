from twitterback.models import CustomUser
from rest_framework import serializers

class ProfileUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    avatar = serializers.ImageField(required=False)

    class Meta:
        model = CustomUser
        fields = ["username", "password", "avatar"]
        extra_kwargs = {
            "username": {"required": False},
        }

    def update(self, instance, validated_data):
        password = validated_data.pop("password", None)
        if password:
            instance.set_password(password)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance
