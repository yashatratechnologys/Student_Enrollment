import { Link, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove JWT token
    localStorage.removeItem("adminToken");

    // Redirect to login
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-blue-900 text-white min-h-screen p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8">
        Admin Panel
      </h2>

      <ul className="space-y-4">
        <li>
          <Link
            to="/admin/dashboard"
            className="hover:text-blue-200"
          >
            Dashboard
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="hover:text-red-300 transition"
          >
            Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSidebar;
