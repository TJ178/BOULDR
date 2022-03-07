import React from 'react';
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage.js";
import CreateAccountPage from "./pages/CreateAccountPage.js";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/layout/Layout";
import FavoriteProblemsPage from "./pages/FavoriteProblemsPage";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";
import AddProblemPage from "./pages/AddProblemPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './contexts/PrivateRoute';
import StaffRoute from './contexts/StaffRoute';



function App() {
  return (
    <AuthProvider>
     <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<FavoriteProblemsPage/>}/>
        <Route path="/problem-details" element={<ProblemDetailsPage/>}>
          <Route path=":problemId" element={<ProblemDetailsPage/>} />
        </Route>
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/profile" element={<PrivateRoute> <ProfilePage /> </PrivateRoute>} />
        <Route path="/add-problem" element={<StaffRoute><AddProblemPage /></StaffRoute>} />
      </Routes>
    </Layout>
    </AuthProvider>
  );
}

export default App;