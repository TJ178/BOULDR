import React from 'react';
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GymPage from "./pages/GymPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import ProfilePage from "./pages/ProfilePage";

import Layout from "./components/layout/Layout";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gym-page" element={<GymPage />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
