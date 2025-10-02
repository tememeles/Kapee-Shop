import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-yellow-400 text-black px-3 sm:px-6 py-2 sm:py-1">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        {/* Language and Currency - Optimized for Samsung A15 */}
        <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 text-xs sm:text-sm w-full sm:w-auto">
          <select className="bg-yellow-400 text-black border border-black rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-black" name="English">
            <option value="">English</option>
            <option value="">Duetch</option>
            <option value="">French</option>
            <option value="">عربي</option>
          </select>
          <select className="bg-yellow-400 text-black border border-black rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-black" name="currency">
            <option value="">$USD</option>
            <option value="">₹INR</option>
            <option value="">£GBP</option>
            <option value="">€EUR</option>
          </select>
        </div>

        {/* Navigation Links - Samsung A15 Optimized */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm w-full sm:w-auto">
          <Link to="/" className="hover:text-gray-700 transition-colors duration-200 text-center whitespace-nowrap">
            Welcome to our store
          </Link>
          
          {isAuthenticated ? (
            <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4">
              <span className="text-xs sm:text-sm font-medium">Hello, {user?.name}</span>
              {isAdmin && (
                <Link 
                  to="/dashboard" 
                  className="hover:text-blue-600 font-semibold text-xs sm:text-sm px-2 py-1 rounded bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
                >
                  Admin
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="hover:text-blue-600 text-xs sm:text-sm bg-black bg-opacity-10 hover:bg-opacity-20 border-none cursor-pointer px-2 py-1 rounded transition-all duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 sm:gap-4">
              <Link 
                to="/login" 
                className="hover:text-blue-600 text-xs sm:text-sm px-2 py-1 rounded bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-200"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="hover:text-blue-600 text-xs sm:text-sm px-2 py-1 rounded bg-black bg-opacity-10 hover:bg-opacity-20 transition-all duration-200 whitespace-nowrap"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
