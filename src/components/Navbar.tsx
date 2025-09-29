import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-yellow-400 text-black px-6 py-1">
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <select className="bg-yellow-400 text-black" name="English" id="">
            <option value="">English</option>
            <option value="">Duetch</option>
            <option value="">French</option>
            <option value="">عربي</option>
          </select>
          <select className="bg-yellow-400 text-black-sm" name="" id="">
            <option value="">$DOLLAR(USA)</option>
            <option value="">RUPEE(INR)</option>
            <option value="">POUND(UK)</option>
            <option value="">EURO(EUR)</option>
          </select>
        </div>
        <div className="flex space-x-6 b-white-300">
          <Link to="/" className="hover:text-gray-300 transition">Welcome to our store</Link>
          
          {isAuthenticated ? (
            <div className="flex space-x-4 items-center">
              <span className="text-sm">Hello, {user?.name}</span>
              {isAdmin && (
                <Link to="/dashboard" className="hover:text-blue-500 font-semibold">
                  Admin Dashboard
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="hover:text-blue-500 text-sm bg-transparent border-none cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">Login</Link>
              <Link to="/register" className="hover:text-blue-500">Register Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
