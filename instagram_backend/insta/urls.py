from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import (RegisterAPIView, FollowAPIView,
UnfollowAPIView, PostCreateAPIView, FeedAPIView, 
LikeAPIView, UnlikeAPIView, CommentAPIView, UserListAPIView, ProfileAPIView)

urlpatterns = [
    path("register/", RegisterAPIView.as_view(), name="register"),
    path("login/", TokenObtainPairView.as_view(), name="login"),
    
    path("users/<int:user_id>/follow/", FollowAPIView.as_view()),
    path("users/<int:user_id>/unfollow/", UnfollowAPIView.as_view()),
    
    path("posts/", PostCreateAPIView.as_view()),
    path("feed/", FeedAPIView.as_view()),
    
    path("posts/<int:post_id>/like/", LikeAPIView.as_view()),
    path("posts/<int:post_id>/unlike/", UnlikeAPIView.as_view()),
    
    path("posts/<int:post_id>/comments/", CommentAPIView.as_view()),
    path("posts/<int:post_id>/comment/", CommentAPIView.as_view()),
    
    path("users/", UserListAPIView.as_view()),
    path("users/<int:user_id>/profile/", ProfileAPIView.as_view()),
]
