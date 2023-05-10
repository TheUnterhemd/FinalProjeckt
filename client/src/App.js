import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Startseite from "./pages/Startseite";
import UserProfile from "./pages/UserProfile";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
  const { user, dispatch } = useContext(AuthContext);

  // useEffect ist nur für einen Testuser aktuell da.
  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: {
        firstName: "Micha",
        lastName: "Dings",
        imgURL: "https://picsum.photos/200",
        interests: ["Surfing", "Climbing", "Chilling"],
        bookedCourses: [
          {
            cname: "Rückenfit",
            trainer: "Kim",
            picture: "https://picsum.photos/200",
          },
          {
            cname: "Rückenfit",
            trainer: "Kim",
            picture: "https://picsum.photos/250",
          },
          {
            cname: "Rückenfit",
            trainer: "Kim",
            picture: "https://picsum.photos/300",
          },
        ],
        solvedCourses: [
          {
            cname: "Rückenfit",
            trainer: "Toni",
            picture: "https://picsum.photos/200",
          },
          {
            cname: "Rückenfit",
            trainer: "Toni",
            picture: "https://picsum.photos/250",
          },
          {
            cname: "Bauch Beine Po",
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
      <Navbar/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/user"
            element={user ? <UserProfile /> : <Startseite />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
