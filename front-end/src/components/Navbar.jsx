import React from "react";
import { Link } from "react-router-dom";
import { FaReact } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="navbar bg-light shadow p-3 mb-5 px-5">
      <div className="container">
        <Link className="navbar-brand" to={"/"}>
          <FaReact
            style={{
              width: 30,
              height: 30,
            }}
            className="me-2 text-danger"
          />
          Expense Tracker
        </Link>
      </div>
    </nav>
  );
}
