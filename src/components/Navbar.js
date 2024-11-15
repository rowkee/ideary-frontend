import React, { useState } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";
import useAuthContext from "../hooks/useAuthContext.js";
import IdeaForm from "../components/IdeaForm";
import DonateButton from "../components/DonateButton";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <div className="navbar my-4">
      <div className="dropdown">
        <label
          tabIndex={0}
          className="btn btn-ghost btn-circle"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        {isDropdownOpen && (
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                to="/"
                onClick={() => setIsDropdownOpen(false)}
                className="font-bold"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/support"
                onClick={() => setIsDropdownOpen(false)}
                className="font-bold"
              >
                Support
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsDropdownOpen(false)}
                className="font-bold"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={() => setIsDropdownOpen(false)}
                className="font-bold"
              >
                About
              </Link>
            </li>
            <li>
              <DonateButton />
            </li>
          </ul>
        )}
      </div>
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl p-1" to="/">
          <h1 className="text-4xl font-bold">Ideary</h1>
        </Link>
      </div>
      <div className="flex-none">
        {user && (
          <div>
            <Link to="/account">
              <span className="btn btn-ghost text-xl">Hello, {user.email}</span>
            </Link>
            <button className="btn" onClick={handleLogoutClick}>
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
            <Link className="btn mr-2" to="/signup">
              Signup
            </Link>
            <Link className="btn " to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
