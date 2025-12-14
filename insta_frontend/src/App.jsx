import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import CreatePost from "./pages/CreatePost";
import Users from "./pages/Users";
import Profile from "./pages/profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/feed" element={ 
          <ProtectedRoute> <Feed/> </ProtectedRoute>} 
        />

        <Route path="/create" element={
          <ProtectedRoute> <CreatePost /> </ProtectedRoute>} 
        />

        <Route path="/users" element={
          <ProtectedRoute> <Users/> </ProtectedRoute>}
        />

        <Route path="/profile/:userId" element={
          <ProtectedRoute> <Profile /> </ProtectedRoute>
        }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
