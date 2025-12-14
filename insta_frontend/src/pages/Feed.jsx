import { useEffect, useState } from "react";
import api from "../api";
import PostCard from "../components/PostCard";
import { useNavigate } from "react-router-dom";

function Feed() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/feed/")
      .then((res) => setPosts(res.data))
      .catch(() => navigate("/login"));
  }, []);

  return (
    <div style={{ background: "#fafafa", minHeight: "100vh" }}>
      <div style={{ width: "420px", margin: "auto", paddingTop: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "600",
              letterSpacing: "0.5px",
            }}
          >
            Feed
          </h2>

          <button
            onClick={() => navigate("/users")}
            style={{
              background: "#e5e7eb",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Find People
          </button>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => navigate("/create")}
              style={{
                background: "#3897f0",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              + Create
            </button>

            <button
              onClick={() => {
                localStorage.removeItem("access");
                navigate("/login");
              }}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 10px",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {posts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No posts to show</p>
        ) : (
          posts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>
    </div>
  );
}

export default Feed;
