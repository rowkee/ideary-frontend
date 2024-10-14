import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout.js";
import useAuthContext from "../hooks/useAuthContext.js";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="text-4xl font-bold">Ideary</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <Link to="/account">
                <span className="font-bold">{user.email}</span>
              </Link>
              <button
                className="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded ml-5"
                onClick={handleClick}
              >
                Logout
              </button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
