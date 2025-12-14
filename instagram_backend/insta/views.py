from rest_framework import status
from rest_framework.response import Response
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.contrib.auth.models import User
from django.db.models import Q
from .models import Follow, Post, Like, Comment
from .serializers import CreatePostSerializer, PostSerializer, CommentSerializer

class UserListAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        users = User.objects.exclude(id=request.user.id)
        
        data = []
        for u in users:
            is_following = Follow.objects.filter(
                follower=request.user, following=u
            ).exists()
            
            data.append({
                "id": u.id,
                "username": u.username,
                "is_following": is_following,
            })
            
        return Response(data)

class RegisterAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        
        if not username or not password:
            return Response({"detail": "username and password required"}, status=status.HTTP_400_BAD_REQUEST)
        
        username = username.strip()
        
        if User.objects.filter(username=username).exists():
            return Response({"detail": "User exists"}, status=status.HTTP_400_BAD_REQUEST)
        
        User.objects.create_user(username=username, password=password)
        return Response({"detail": "User created"}, status=status.HTTP_201_CREATED)


class FollowAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, user_id):
        try:
            target_user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if request.user == target_user:
            return Response({"detail": "You cannot follow yourself"}, status=status.HTTP_400_BAD_REQUEST)
        
        if Follow.objects.filter(follower=request.user, following=target_user).exists():
            return Response({"detail": "Already following"}, status=status.HTTP_400_BAD_REQUEST)
        
        Follow.objects.create(follower=request.user, following=target_user)
        return Response({"detail": "Followed Successfully"}, status=status.HTTP_201_CREATED)
    

class UnfollowAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, user_id):
        deleted, _ = Follow.objects.filter(follower=request.user, following_id=user_id).delete()
        
        if deleted == 0:
            return Response({"detail": "You are not following this user"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Unfollowed successfully"}, status=status.HTTP_200_OK)
    

class PostCreateAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = CreatePostSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        post  = serializer.save(user=request.user)
        
        response_serializer = PostSerializer(post)
        
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    

class ProfileAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({"detail": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        
        posts = Post.objects.filter(user=user).order_by("-created_at")
        is_following = Follow.objects.filter(
            follower=request.user, following=user
        ).exists()
        
        return Response({
            "id": user.id,
            "username": user.username,
            "is_following": is_following,
            "posts": PostSerializer(posts, many=True).data,
        })


class FeedAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        following_ids = Follow.objects.filter(follower=request.user).values_list("following_id", flat=True)
        
        posts = Post.objects.filter(
            Q(user__id__in=following_ids) | Q(user=request.user)
        ).order_by("-created_at")
        
        serializer = PostSerializer(posts, many=True)
        
        return Response(serializer.data)
    

class LikeAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        
        if Like.objects.filter(user=request.user, post=post).exists():
            return Response({"detail": "Already liked"}, status=status.HTTP_400_BAD_REQUEST)
        
        Like.objects.create(user=request.user, post=post)
        
        return Response({"detail": "Post liked"}, status=status.HTTP_201_CREATED)
    
    
class UnlikeAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
        deleted, _ = Like.objects.filter(user=request.user, post_id=post_id).delete()
        
        if deleted == 0:
            return Response({"detail": "You have not liked this post"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"detail": "Post  unliked"}, status=status.HTTP_200_OK)
    

class CommentAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    
    def post(self, request, post_id):
        text = request.data.get("text")
        
        if not text:
            return Response({"detail": "Comment text is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            post = Post.objects.get(id=post_id)
        except Post.DoesNotExist:
            return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
        
        comment = Comment.objects.create(user=request.user, post=post, text=text)
        
        serializer = CommentSerializer(comment)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    def get(self, request, post_id):
        comments = Comment.objects.filter(post_id=post_id).order_by("created_at")
        
        serializer = CommentSerializer(comments, many=True)
        
        return Response(serializer.data) 