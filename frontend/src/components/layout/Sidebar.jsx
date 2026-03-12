import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MdDashboard, MdTrendingUp, MdTrendingDown, MdLogout } from "react-icons/md";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Nav items with path, label, icon
  const navItems = [
    { path: "/", label: "Dashboard", icon: <MdDashboard size={20} /> },
    { path: "/income", label: "Income", icon: <MdTrendingUp size={20} /> },
    { path: "/expenses", label: "Expenses", icon: <MdTrendingDown size={20} /> },
  ];

  // Get initials for avatar
  const initials = user?.name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "U";

  return (
    <aside className="w-64 bg-white h-screen fixed left-0 top-0 shadow-lg flex flex-col z-10">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-2xl">💰</span>
          <span className="text-lg font-bold text-gray-800">ExpenseTracker</span>
        </div>
      </div>

      {/* Profile section */}
      <div className="px-6 py-5 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
            {initials}
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
            <p className="text-gray-400 text-xs truncate w-36">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
          Menu
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition font-medium text-sm ${
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout button at bottom */}
      <div className="px-4 py-5 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition w-full font-medium text-sm"
        >
          <MdLogout size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
