import React from "react";
import { NavLink } from "react-router";

function Navbar() {
  return (
    <nav className="navbar">

      <NavLink to="/" end>
        Home
      </NavLink>

      <NavLink to="/about">
        About
      </NavLink>

      <NavLink to="/child-profile">
        Child Profile
      </NavLink>

      <NavLink to="/parent-profile">
        Parent Profile
      </NavLink>

    </nav>
  );
}

export default Navbar;