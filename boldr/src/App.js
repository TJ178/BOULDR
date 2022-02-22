import { Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import ProfilePage from "./pages/ProfilePage";
import gymPic from "./assets/gymPic.png";
import Layout from "./components/layout/Layout";
import ProblemDetailsPage from "./pages/ProblemDetailsPage";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/problem-details" element={<ProblemDetailsPage prob={tempProbs[0]} />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Layout>
  );
}

export default App;

const tempProbs = [
  {
    id: 1,
    image: gymPic,
    title: "A Silly Little Problem",
    isFavorite: false,
    gym: "Wooden",
    description: "Go touch rock",
    rating:3.5,
    difficulty: 1,
  },
  {
    id: 2,
    image: gymPic,
    title: "Something is going up?",
    isFavorite: false,
    gym: "Cliffs of Id",
    description: "Go touch rock but at this gym",
  },
];
