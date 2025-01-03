import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./components/commons/Nav";
import LinksView from "./components/Dashboard/LinksView";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Analytics from "./components/Analytics/Analytics";
import Profile from "./components/Auth/Profile";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import UserPublicPage from "./components/UserPublicPage";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Nav />
        <Routes>
          <Route path="/:username" element={<UserPublicPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<LinksView />} />
          <Route path="/add-link" element={<LinksView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
