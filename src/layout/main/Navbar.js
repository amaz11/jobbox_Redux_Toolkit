import { signOut } from "firebase/auth";
import React from "react";
import { useSelector } from "react-redux";

import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();
  const { email } = useSelector((state) => state.auth);
  const handelSingOut = ()=>{
    signOut()
  }
  return (
    <nav
      className={`h-14 fixed w-full z-[999] ${
        pathname === "/" ? null : "bg-white"
      }`}
    >
      <ul className="max-w-7xl mx-auto flex gap-3 h-full items-center">
        <li className="flex-auto font-semibold text-2xl">
          <Link to="/">JobBox</Link>
        </li>
        <li>
          <Link className="hover:text-primary" to="/jobs">
            Jobs
          </Link>
        </li>

        <li>
          {email?<button onClick={handelSingOut}
            className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all"
          >
            Logout
          </button>:<Link
            className="border border-black px-2 py-1 rounded-full hover:border-primary hover:text-white hover:bg-primary hover:px-4 transition-all "
            to="/login"
          >
            Login
          </Link>}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;