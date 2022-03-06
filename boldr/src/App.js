import React from 'react';
import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.js";
import CreateAccountPage from "./pages/CreateAccountPage.js";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/layout/Layout";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";
import AddProblemPage from "./pages/AddProblemPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './contexts/AuthContext';


function App() {
  return (
    <AuthProvider>
     <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/problem-details" element={<ProblemDetailsPage/>}>
          <Route path=":problemId" element={<ProblemDetailsPage/>} />
        </Route>
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/add-problem" element={<AddProblemPage />} />
      </Routes>
    </Layout>
    </AuthProvider>
    
  );
}

export default App;