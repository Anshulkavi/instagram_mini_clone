import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";
import PostCard from "../components/PostCard";

function Profile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/users/${userId}/profile/`)
      .then((res) => setProfile(res.data));
  }, [userId]);

  if (!profile) return <p>Loading...</p>;

  const toggleFollow = async () => {
    if (profile.is_following) {
      await api.post(`/users/${profile.id}/unfollow/`);
    } else {
      await api.post(`/users/${profile.id}/follow/`);
    }

    setProfile({
      ...profile,
      is_following: !profile.is_following,
    });
  };

  return (
    <div style={{ maxWidth: "420px", margin: "auto", paddingTop: "20px" }}>
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        ← Back
      </button>

      <h2>{profile.username}</h2>

      <button
        onClick={toggleFollow}
        style={{
          marginBottom: "20px",
          background: profile.is_following ? "#e5e7eb" : "#3897f0",
          color: profile.is_following ? "#000" : "#fff",
          border: "none",
          padding: "6px 12px",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {profile.is_following ? "Unfollow" : "Follow"}
      </button>

      {profile.posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Profile;
