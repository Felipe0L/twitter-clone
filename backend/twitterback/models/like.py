# twitterback/models/like.py
from django.db import models
from django.contrib.auth import get_user_model
from .post import Post

User = get_user_model()

class Like(models.Model):
    user = models.ForeignKey(User, related_name="likes", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="likes", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "post")
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user} ♥ {self.post_id}"
