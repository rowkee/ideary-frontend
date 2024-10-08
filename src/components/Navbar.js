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
              <button onClick={handleClick}>Logout</button>
              <Link to="/account">
                <span>{user.email}</span>
              </Link>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
