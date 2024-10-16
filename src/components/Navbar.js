import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";
import useAuthContext from "../hooks/useAuthContext.js";
import IdeaForm from "../components/IdeaForm";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutClick = () => {
    logout();
  };

  const handleNewIdeaClick = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="navbar">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to="/">
          <h1 className="text-4xl font-bold">Ideary</h1>
        </Link>
      </div>
      <div className="flex-none">
        {user && (
          <div>
            <Link to="/account">
              <span className="btn btn-ghost text-xl">{user.email}</span>
            </Link>
            <button
              className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-3"
              onClick={handleLogoutClick}
            >
              Logout
            </button>
            <button
              className="bg-transparent hover:bg-green-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-3"
              onClick={handleNewIdeaClick}
            >
              + New Idea
            </button>
            <IdeaForm isVisible={modalVisible} onClose={handleCloseModal} />
          </div>
        )}
        {!user && (
          <div>
            <Link
              className="bg-transparent hover:bg-green-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-3"
              to="/signup"
            >
              Signup
            </Link>
            <Link
              className="bg-transparent hover:bg-green-500 text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-3"
              to="/login"
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
