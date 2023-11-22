import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nabvar from "./components/Nabvar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Nabvar showAlert={showAlert}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exacr path="/" element={<Home showAlert={showAlert} />} />
              <Route
                exacr
                path="/about"
                element={<About showAlert={showAlert} />}
              />
              <Route
                exacr
                path="/login"
                element={<Login showAlert={showAlert} />}
              />
              <Route
                exacr
                path="/signup"
                element={<Signup showAlert={showAlert} />}
              />
              {/* <Route exacr path="/users" element={<Users/>}/> */}
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
