import React,{useState} from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
 
  const closeMenu = () => setIsOpen(false);
 

  return (
    <nav className="navbar">


<button
        type="button"
        className="navbar-toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
      <div
        id="primary-navigation"
        className={`navbar-links ${isOpen ? "open" : ""}`}
      >

      
      <NavLink to="/" end onClick={closeMenu}>
          Home
        </NavLink>
 
        <NavLink to="/about" onClick={closeMenu}>
          About
        </NavLink>
 
        <NavLink to="/child-profile" onClick={closeMenu}>
          Child Profile
        </NavLink>
 
        <NavLink to="/parent-profile" onClick={closeMenu}>
          Parent Profile
        </NavLink>
 
      </div>
 
    </nav>
  );
}
 
export default Navbar;
