import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="text-4xl font-bold">Ideary</h1>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
