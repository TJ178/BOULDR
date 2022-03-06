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
import PrivateRoute from './contexts/PrivateRoute';



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/problem-details" element={<Layout><ProblemDetailsPage/></Layout>}>
          <Route path=":problemId" element={<Layout><ProblemDetailsPage/></Layout>} />
        </Route>
        <Route path="/create-account" element={<Layout><CreateAccountPage /></Layout>} />
        <Route path="/profile" element={<Layout><PrivateRoute> <ProfilePage /> </PrivateRoute></Layout>} />
        <Route path="/add-problem" element={<Layout><AddProblemPage /></Layout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
