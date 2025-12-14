from rest_framework import serializers
from .models import Post, Comment
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username"]
        
class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    likes_count = serializers.IntegerField(source="likes.count", read_only=True)
    comments_count = serializers.IntegerField(source="comments.count", read_only=True)
    
    class Meta:
        model = Post
        fields = ["id", "user", "image_url", "caption", "created_at", "likes_count", "comments_count"]
        
class CreatePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ["image_url", "caption"]
        
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = Comment
        fields = ["id", "user", "text", "created_at"]