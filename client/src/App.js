import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserDetailpage from "./pages/UserDetailpage";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AllTrainers from "./pages/AllTrainers";
import AllCourses from "./pages/AllCourses";
import TrainerDetailpage from "./pages/TrainerDetailpage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseCreationForm from "./pages/forTrainerFrontend/CourseCreationForm";
import SearchPage from "./pages/SearchPage";

function App() {
  const { user } = useContext(AuthContext);
  console.log("user on App.js", user);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/user"
            element={user ? <UserDetailpage /> : <LandingPage />}
          />
          <Route path="/trainer" element={<AllTrainers />} />
          <Route path="/trainer/:id" element={<TrainerDetailpage />} />
          <Route path="/course" element={<AllCourses />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          {/* Routes for Trainers only */}
          <Route
            path="/course/create"
            element={
              user && user.isTrainer ? <CourseCreationForm /> : <LandingPage />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
