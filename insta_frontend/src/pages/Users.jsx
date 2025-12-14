import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/users/").then((res) => setUsers(res.data));
  }, []);

  const toggleFollow = async (userId, isFollowing) => {
    try {
      if (isFollowing) {
        await api.post(`/users/${userId}/unfollow/`);
      } else {
        await api.post(`/users/${userId}/follow/`);
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, is_following: !isFollowing } : u
        )
      );
    } catch (err) {
      alert(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div style={{ maxWidth: "420px", margin: "auto", paddingTop: "20px" }}>
      <h3 style={{ marginBottom: "16px" }}>Find People</h3>

      {users.map((u) => (
        <div
          key={u.id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
            borderBottom: "1px solid #eee",
            paddingBottom: "8px",
          }}
        >
          <b
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/profile/${u.id}`)}
          >
            {u.username}
          </b>

          <button
            onClick={() => toggleFollow(u.id, u.is_following)}
            style={{
              background: u.is_following ? "#e5e7eb" : "#3897f0",
              color: u.is_following ? "#000" : "#fff",
              border: "none",
              padding: "4px 10px",
              borderRadius: "4px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {u.is_following ? "Unfollow" : "Follow"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default Users;
