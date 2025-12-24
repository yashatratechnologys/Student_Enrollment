import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-blue-900 fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link to="/" className="text-white font-bold text-xl">
          Yashatra Technologies
        </Link>

        <div className="hidden md:flex gap-6">
          <Link to="/" className="text-white">Student Enrollment</Link>
          <Link
            to="/admin/login"
            className="bg-white text-blue-900 px-4 py-1 rounded"
          >
            Admin Login
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-blue-800 px-4">
          <Link to="/" className="block text-white py-2">Student</Link>
          <Link to="/admin/login" className="block text-white py-2">Admin</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
