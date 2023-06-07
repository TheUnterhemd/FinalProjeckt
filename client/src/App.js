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
import jwt_decode from "jwt-decode";
import Footer from "./components/Footer";

function App() {
  const { user, dispatch } = useContext(AuthContext);
  console.log("user on App.js", user);

  const refreshToken = async () => {
    const url = process.env.REACT_APP_SERVER_URL;

    try {
      const response = await fetch(`${url}/token/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
        credentials: "include",
      });

      const data = await response.json();
      const decodedToken = jwt_decode(data.accessToken);
      const tokenUser = decodedToken.user;
      tokenUser.accessToken = data.accessToken;
      dispatch({ type: "LOGIN", payload: tokenUser });
    } catch (error) {
      /* console.log(error); */
    }
  };

  user ? setInterval(refreshToken, 57 * 60 * 1000) : refreshToken();

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
              user && user.trainer ? <CourseCreationForm /> : <LandingPage />
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
