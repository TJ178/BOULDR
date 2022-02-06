import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import GymPage from "./pages/GymPage";

import Layout from "./components/layout/Layout"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/gym-page" element={<GymPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
