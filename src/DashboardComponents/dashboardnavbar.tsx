import { LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white flex flex-row justify-between  solid items-center text-black shadow-md fixed top-0 left-40 right-0 h-16 z-10 px-8">
      {/* Left side: Title */}
      <div className="text-2xl font-bold">
        <h2>Admin Dashboard</h2>
      </div>

      {/* Right side: User info and logout */}
      <div className="flex flex-row justify-around items-center hover:translate-y-[-0.1rem] relative">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-black hover:bg-gray-100 transition-colors mr-4"
        >
          <LogOut size={18} color="red" />
          Logout
        </button>
        
        <p className="font-bold mr-2">{user?.name || 'Admin'}</p>
        <div className="relative">
          <img
            src="/src/assets/100.jpg"
            alt="Profile"
            className="w-14 h-14 rounded-full border border-black"
          />
          {/* Green light indicator */}
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



