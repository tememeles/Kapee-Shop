import { Link } from "react-router-dom"
import { useState } from "react"
import Kapee from '../assets/kapee.png'
import { FaSearch } from "react-icons/fa";
import { Heart } from "lucide-react";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlinePerson3 } from "react-icons/md";
import Img1 from '../assets/earphone.png'
import Cards from '../components/cards'
import BestSellingProducts from '../components/BestSellingProducts'
import CartSidebar from '../components/CartPage'
import WishlistPopup from '../components/WishlistPopup'
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../hooks/useWishlist';



const Sidebar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
  const { wishlistCount } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
   
  return (
    <div>

      <div className="flex flex-col sm:flex-row border border-black min-h-16 sm:h-auto justify-between items-center p-4 sm:p-0 gap-4 sm:gap-0">
        <img src={Kapee} alt="Kapee Logo" className="h-8 sm:h-12 order-1" />
        
        {/* Search Section */}
        <div className="flex flex-col sm:flex-row w-full sm:w-auto order-3 sm:order-2 gap-2 sm:gap-0 sm:pr-48">
          <div className="flex w-full sm:w-auto">
            <input 
              className="flex-1 sm:w-80 md:w-96 h-10 sm:h-12 px-3 border border-black text-sm" 
              type="text" 
              placeholder="Search products, categories..." 
            />
            <select className="w-auto sm:w-auto border border-black h-10 sm:h-12 px-2 text-sm" name="All Categories">
              <option value="">All Categories</option>
              <option value="">Accessories</option>
              <option value="">Analog</option>
              <option value="">Anklets</option>
              <option value="">Beauty Accessories</option>
              <option value="">Belts</option>
              <option value="">Bracelets</option>
              <option value="">Casual shoes</option>
              <option value="">Digital</option>
              <option value="">Dresses</option>
              <option value="">Earrings</option>
              <option value="">Electronics</option>
            </select>
            <button className="bg-black p-2 sm:p-3 rounded-r-md">
              <FaSearch className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
            </button>
          </div>
        </div>
        
        {/* User Actions */}
        <div className="flex items-center gap-3 sm:gap-4 order-2 sm:order-3">
        {isAuthenticated ? (
          <div className="flex items-center gap-2">
            <MdOutlinePerson3 className="w-5 h-5 sm:w-6 sm:h-6"/>
            <span className="text-xs sm:text-sm hidden sm:inline">Hello, {user?.name}</span>
            <span className="text-xs sm:hidden">{user?.name}</span>
          </div>
        ) : (
          <Link to="/login" className="hover:text-yellow-500">
            <button className="flex items-center gap-1 text-sm sm:text-base">
              <MdOutlinePerson3 className="w-5 h-5 sm:w-6 sm:h-6"/>
              <span className="hidden sm:inline">Hello SIGN IN</span>
              <span className="sm:hidden">Sign In</span>
            </button>
          </Link>
        )}
          
          <button 
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-1 relative hover:text-red-500 transition text-sm sm:text-base"
          >
            <Heart 
              size={18}
              className={`transition-all duration-300 sm:w-5 sm:h-5 ${
                wishlistCount > 0 
                  ? 'text-red-500 fill-red-500' 
                  : 'text-gray-600 hover:text-red-500'
              }`}
            />
            <span className="hidden sm:inline">Wishlist</span>
            {wishlistCount > 0 && (
              <span className="bg-pink-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center absolute -top-1 -right-1 animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-1 relative hover:text-yellow-500 transition text-sm sm:text-base"
          >
            <IoBagOutline className="text-lg sm:text-xl"/>
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center absolute -top-1 -right-1">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>




  <div className="flex flex-col lg:flex-row">
  {/* Left Sidebar */}
  <div className="w-full lg:w-auto lg:min-h-screen">
    <ul className="flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2 border p-2 lg:p-4 overflow-x-auto lg:overflow-x-visible">
      <li className="text-sm sm:text-base lg:text-xl font-bold text-black p-2 lg:p-4 bg-yellow-400 whitespace-nowrap">Shop by category</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Men's Clothing</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Women's Clothing</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Accessories</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Shoes</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Jewellery</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Bags & Backpacks</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Watches</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Dresses</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer p-2 lg:p-0 whitespace-nowrap text-sm sm:text-base">Shirts</li>
    </ul> 
  </div>

  {/* Right Side Content */}
  <div className="flex-1 relative overflow-hidden">
  {/* Navbar */}
  <div className="w-full bg-white shadow-md relative z-20">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-4 flex items-center justify-between">
      <ul className="flex flex-wrap space-x-2 sm:space-x-4 md:space-x-8 text-sm sm:text-base lg:text-lg font-medium text-gray-700">
        <li className="hover:text-yellow-500 cursor-pointer">Home</li>
       <a href="#features"> <li className="hover:text-yellow-500 cursor-pointer">Shop</li></a>
        <li className="hover:text-yellow-500 cursor-pointer hidden sm:inline">Pages</li>
        <Link to="/blog">
          <li className="hover:text-yellow-500 cursor-pointer">Blog</li>
        </Link>
        <li className="hover:text-yellow-500 cursor-pointer hidden md:inline">Elements</li>
        <button className="bg-yellow-500 text-white px-3 sm:px-5 py-1 sm:py-2 rounded-lg hover:bg-yellow-600 transition text-sm sm:text-base">
          Buy Now
        </button>
      </ul>
    </div>
  </div>

  
  <div className="relative bg-white px-4 sm:px-8 md:px-16 py-8 sm:py-16 md:py-24">
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
      {/* Text Section */}
      <div className="max-w-md text-center md:text-left order-2 md:order-1">
        <p className="text-yellow-400 text-xs sm:text-sm font-semibold uppercase mb-2">BEST HEADPHONES</p>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 leading-tight">WIRELESS AUDIO EXPERIENCE</h1>
        <p className="text-base sm:text-lg text-gray-700 mb-6">Up To 70% Off</p>
        <button className="bg-yellow-400 text-black font-bold px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-yellow-500 transition text-sm sm:text-base">
          BUY NOW
        </button>
      </div>

      {/* Image Section */}
      <div className="order-1 md:order-2">
        <img src={Img1} alt="Headphones" className="h-40 sm:h-60 md:h-80 object-contain hover:translate-y-[-1rem] sm:hover:translate-y-[-2rem] duration-1000" />
      </div>
    </div>
  </div>

</div>
</div>

     
     
     
     <div id="features"><Cards /></div>
     
     {/* Best Selling Products Section */}
     <div className="bg-gray-50 py-8">
       <BestSellingProducts />
     </div>
     
     {/* Cart Sidebar */}
     <CartSidebar 
       isOpen={isCartOpen} 
       onClose={() => setIsCartOpen(false)} 
     />
     
     {/* Wishlist Popup */}
     <WishlistPopup 
       isOpen={isWishlistOpen} 
       onClose={() => setIsWishlistOpen(false)} 
     />
      
    </div>
  );
};

export default Sidebar;
