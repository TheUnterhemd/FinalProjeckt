import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startseite from "./pages/Startseite";
import UserDetailpage from "./pages/UserDetailpage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";
import AllTrainers from "./pages/AllTrainers";
import AllCourses from "./pages/AllCourses";
import TrainerDetailpage from "./pages/TrainerDetailpage";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  // useEffect ist nur für einen Testuser aktuell da.
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: {
        _id: "fakeidfortestingpurposes",
        firstName: "Micha",
        lastName: "Dings",
        imgURL: "https://picsum.photos/200",
        interests: ["Surfing", "Climbing", "Chilling"],
        bookedCourses: [
          {
            title: "Rückenfit",
            trainer: "Kim",
            picture: "https://picsum.photos/200",
          },
          {
            title: "Rückenfit",
            trainer: "Kim",
            picture: "https://picsum.photos/250",
          },
          {
            title: "Rückenfit",
            trainer: "Kim",
            picture: "https://picsum.photos/300",
          },
        ],
        solvedCourses: [
          {
            title: "Rückenfit",
            trainer: "Toni",
            picture: "https://picsum.photos/200",
          },
          {
            title: "Rückenfit",
            trainer: "Toni",
            picture: "https://picsum.photos/250",
          },
          {
            title: "Bauch Beine Po",
            trainer: "Toni",
            picture: "https://picsum.photos/300",
          },
        ],
        comments: [
          {
            author: "toni",
            text: "great having Micha around!Could work a little more on his buttcheecks though.",
          },
        ],
      },
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/user"
            element={user ? <UserDetailpage /> : <Startseite />}
          />
          <Route path="/trainers" element={<AllTrainers />} />
          <Route path="/trainers/:id" element={<TrainerDetailpage />} />
          <Route path="/courses" element={<AllCourses />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
