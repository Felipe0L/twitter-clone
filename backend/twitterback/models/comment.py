# twitterback/models/comment.py
from django.db import models
from django.contrib.auth import get_user_model
from .post import Post

User = get_user_model()

class Comment(models.Model):
    user = models.ForeignKey(User, related_name="comments", on_delete=models.CASCADE)
    post = models.ForeignKey(Post, related_name="comments", on_delete=models.CASCADE)
    content = models.TextField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"Comment({self.id}) on Post({self.post_id}) by {self.user}"
