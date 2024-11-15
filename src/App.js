import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthContext from "./hooks/useAuthContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Ideas from "./pages/Ideas";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import MyAccount from "./pages/MyAccount";
import Support from "./pages/Support";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App mx-4">
      <Router>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Navigate to="/ideas" /> : <Home />}
            />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/ideas" element={<Ideas />} />
            <Route
              path="/login"
              element={user ? <Navigate to="/ideas" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/ideas" /> : <Signup />}
            />
            <Route
              path="/account"
              element={!user ? <Navigate to="/login" /> : <MyAccount />}
            />
            <Route path="/support" element={<Support />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
