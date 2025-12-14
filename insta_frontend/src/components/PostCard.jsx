import api from "../api";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const [likes, setLikes] = useState(post.likes_count);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);  const navigate = useNavigate();


  useEffect(() => {
    api
      .get(`/posts/${post.id}/comments/`)
      .then((res) => setComments(res.data))
      .catch(() => setComments([]));
  }, [post.id]);

const likePost = async () => {
  if (likeLoading) return;
  setLikeLoading(true);

  try {
    if (!liked) {
      await api.post(`/posts/${post.id}/like/`);
      setLikes((prev) => prev + 1);
      setLiked(true);
    } else {
      await api.post(`/posts/${post.id}/unlike/`);
      setLikes((prev) => prev - 1);
      setLiked(false);
    }
  } catch (err) {
    if (!liked && err.response?.status === 400) {
      setLiked(true);
    }
  } finally {
    setLikeLoading(false);
  }
};


const addComment = async () => {
  if (!comment.trim()) return;

  try {
    const res = await api.post(`/posts/${post.id}/comment/`, {
      text: comment,
    });

    setComments((prev) => [...prev, res.data]);
    setComment("");
  } catch {
    alert("Failed to add comment");
  }
};


  return (
    <div className="card">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "6px",
        }}
      >
        <b
          style={{cursor: "pointer"}}
          onClick={() => navigate(`/profile/${post.user.id}`)}
        >
            {post.user.username}
        </b>

      </div>

      <img src={post.image_url} alt="" style={{ width: "100%" }} />

      <p>{post.caption}</p>

      <div className="actions">
        <span
          className={`like-icon ${liked ? "liked" : ""}`}
          onClick={likePost}
        >
          {liked ? "❤️" : "🤍"}
        </span>
        <span>{likes} likes</span>
      </div>

      <div style={{ marginTop: "8px" }}>
        {comments.map((c) => (
          <p key={c.id} style={{ fontSize: "13px" }}>
            <b>{c.user.username}</b> {c.text}
          </p>
        ))}
      </div>

      <input
        style={{ marginTop: "8px" }}
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        style={{ marginTop: "6px", marginBottom: "12px" }}
        onClick={addComment}
      >
        Post
      </button>
    </div>
  );
}

export default PostCard;
