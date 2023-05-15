import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startseite from "./pages/Startseite";
import UserDetailpage from "./pages/UserDetailpage";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AllTrainers from "./pages/AllTrainers";
import AllCourses from "./pages/AllCourses";
import TrainerDetailpage from "./pages/TrainerDetailpage";
import CourseDetailPage from "./pages/CourseDetailPage";
import CourseCreationForm from "./pages/forTrainerFrontend/CourseCreationForm";
function App() {
  const { user, dispatch } = useContext(AuthContext);

  // useEffect ist nur für einen Testuser aktuell da.
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: {
        _id: "645e4828670eaab12beded5e",
        firstName: "Tom",
        lastName: "Hunter",
        email: "test1234@gmail.com",
        password:
          "$2b$12$SOP.a5kDWZWitgRJVgHuKeHShQi5WLSppJcJgUVNXRU67QFe8Tr2q",
        imgURL:
          "https://res.cloudinary.com/dhdugvhj3/image/upload/v1683900457/localtrainer/avatar/user/645e4828670eaab12beded5e/profile_picture_645e4828670eaab12beded5e.jpg",
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
        comments: [],
      },
    });
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/user"
            element={user ? <UserDetailpage /> : <Startseite />}
          />
          <Route path="/trainer" element={<AllTrainers />} />
          <Route path="/trainer/:id" element={<TrainerDetailpage />} />
          <Route path="/course" element={<AllCourses />} />
          <Route path="/course/:id" element={<CourseDetailPage />} />
          <Route path="/course/create" element={<CourseCreationForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
