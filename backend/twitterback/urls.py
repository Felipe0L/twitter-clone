from django.urls import path, include
from rest_framework.routers import DefaultRouter
from twitterback.viewsets.customuser_viewset import CustomUserViewSet
from twitterback.viewsets.userprofile_viewset import UserProfileView
from twitterback.viewsets.logout_viewset import LogoutView
from twitterback.viewsets.profile_update_viewset import ProfileUpdateView
from twitterback.viewsets.follow_viewset import (
    FollowToggleView,
    FollowersListView,
    FollowingListView
)
from twitterback.viewsets.like_viewset import LikeViewset
from twitterback.viewsets.post_viewset import PostViewSet
from twitterback.viewsets.comment_viewset import CommentListCreateView, CommentDeleteView
from twitterback.viewsets.feed_viewset import FeedView


router = DefaultRouter()
router.register(r'users', CustomUserViewSet)
router.register(r'posts', PostViewSet, basename='post')

urlpatterns = [
    path('', include(router.urls)),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path("profile/update/", ProfileUpdateView.as_view(), name="profile-update"),

    path("follow/<int:user_id>/toggle/", FollowToggleView.as_view(), name="follow-toggle"),
    path("users/<int:user_id>/followers/", FollowersListView.as_view(), name="followers-list"),
    path("users/<int:user_id>/following/", FollowingListView.as_view(), name="following-list"),

    path('posts/<int:pk>/comments/', CommentListCreateView.as_view(), name='comment-list-create'),
    path("posts/<int:pk>/comments/<int:comment_id>/", CommentDeleteView.as_view(), name="comment-delete"),
    path("feed/", FeedView.as_view(), name="feed"),
]
