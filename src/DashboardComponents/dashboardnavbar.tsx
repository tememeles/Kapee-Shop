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
    <nav className="bg-white flex flex-row justify-between solid items-center text-black shadow-md fixed top-0 left-0 lg:left-40 right-0 h-16 z-30 px-4 lg:px-8">
      {/* Left side: Title - Add margin for mobile menu button */}
      <div className="text-lg lg:text-2xl font-bold ml-12 lg:ml-0">
        <h2>Admin Dashboard</h2>
      </div>

      {/* Right side: User info and logout */}
      <div className="flex flex-row justify-around items-center hover:translate-y-[-0.1rem] relative">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-1 lg:gap-2 px-2 lg:px-3 py-2 rounded-lg text-sm text-black hover:bg-gray-100 transition-colors mr-2 lg:mr-4"
        >
          <LogOut size={16} color="red" />
          <span className="hidden sm:inline">Logout</span>
        </button>
        
        <p className="font-bold mr-2 text-sm hidden md:block">{user?.name || 'Admin'}</p>
        <div className="relative">
          <img
            src="/src/assets/100.jpg"
            alt="Profile"
            className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border border-black"
          />
          {/* Green light indicator */}
          <span className="absolute bottom-0 right-0 w-3 h-3 lg:w-4 lg:h-4 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



