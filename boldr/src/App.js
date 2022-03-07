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
import ErrorPage from "./pages/ErrorPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './contexts/PrivateRoute';
import StaffRoute from './contexts/StaffRoute';



function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorites" element={<Layout><FavoriteProblemsPage/></Layout>}/>
        <Route path="/problem-details" element={<Layout><ProblemDetailsPage/></Layout>}>
          <Route path=":problemId" element={<Layout><ProblemDetailsPage/></Layout>} />
        </Route>
        <Route path="/create-account" element={<CreateAccountPage />}/>
        <Route path="/profile" element={<PrivateRoute><Layout> <ProfilePage /> </Layout></PrivateRoute>} />
        <Route path="/add-problem" element={<StaffRoute><Layout><AddProblemPage /></Layout></StaffRoute>} />
        <Route path='*' element={<Layout><ErrorPage/></Layout>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;