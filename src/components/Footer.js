import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-base-100 text-base-content p-4 flex flex-col m-0 gap-0">
      <div className="flex flex-row justify-between text-center mx-auto">
        <nav className="flex flex-col">
          <h6 className="footer-title">Products</h6>
          <Link to="/ideas" className="link link-hover">
            Ideas
          </Link>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title">Company</h6>
          <Link to="/about" className="link link-hover">
            About us
          </Link>
          <Link to="/contact" className="link link-hover">
            Contact
          </Link>
        </nav>
        <nav className="flex flex-col">
          <h6 className="footer-title">Support</h6>
          <Link to="/contact" className="link link-hover">
            Support
          </Link>
          <Link to="/faq" className="link link-hover">
            FAQ
          </Link>
        </nav>
      </div>
      <div className="text-center mt-4 mx-auto">
        Copyright © 2024 - All right reserved by Ideary Ltd
      </div>
    </footer>
  );
}

export default Footer;
