import "../container/Nav.css";
import React, { useState, useEffect } from "react";
function Nav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        src="https://www.freepnglogos.com/uploads/red-netflix-logo-text-png-3.png"
        className="nav-logo"
      />
      <img
        src="https://i.pinimg.com/originals/2b/90/0d/2b900d5612554cd0b5edf7d8e848c3ea.png"
        className="nav-avatar"
      />
    </div>
  );
}

export default Nav;
