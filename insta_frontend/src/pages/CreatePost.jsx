import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const navigate = useNavigate();

  const submitPost = async () => {
    if (!imageUrl) {
      alert("Image URL is required");
      return;
    }

    try {
      await api.post("/posts/", {
        image_url: imageUrl,
        caption,
      });
      navigate("/feed");
    } catch {
      alert("Failed to create post");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>Create Post</h2>

        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <input
          placeholder="Caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />

        <button onClick={submitPost}>Post</button>
      </div>
    </div>
  );
}

export default CreatePost;