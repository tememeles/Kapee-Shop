import { Link } from "react-router-dom"
import Kapee from '../assets/kapee.png'
import { FaSearch } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlinePerson3 } from "react-icons/md";
import Img1 from '../assets/earphone.png'
import Cards from '../components/cards'
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';



const Sidebar = () => {
  const { totalItems } = useCart();
  const { isAuthenticated, user } = useAuth();
   
  return (
    <div>

      <div  className="flex flex-row border border-black h-[-2rem] justify-between">
        <img src={Kapee} alt="" className="h-12 m-8" />
        <div className="flex flex-row pr-48">
          <input className="w-96 h-12 mt-8 border border-black" type="text" placeholder="  Search for products, categgories,branchs,sku..." />
          <select className="" name="All Categories" id="">
            <option value="">All Categories</option>
            <option value="">Accesories</option>
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
          <button><FaSearch  className="w-12 h-8 text-yellow-400 bg-black w-18 rounded-md" /></button>
        </div>
        {isAuthenticated ? (
          <div className="flex items-center gap-2 mt-5">
            <MdOutlinePerson3 className="w-8 h-6"/>
            <span className="text-sm">Hello, {user?.name}</span>
          </div>
        ) : (
          <Link to="/login" className="hover:text-yellow-500 mt-5">
            <button className="pr-6 flex items-center gap-1">
              <MdOutlinePerson3 className="w-8 h-6"/>
              <span>Hello SIGN IN</span>
            </button>
          </Link>
        )}
          
          <button  className="pr-6"><FcLike/></button>
          <Link to="/cart" className="pr-6 flex items-center gap-1 relative hover:text-yellow-500 transition">
            <IoBagOutline className="text-xl"/>
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center absolute -top-1 -right-1">
                {totalItems}
              </span>
            )}
          </Link>
      </div>




  <div className="flex">
  {/* Left Sidebar */}
  <div className=" min-h-screen   ">
    <ul className="space-y-5 border p-4">
      <li className="text-xl font-bold text-black p-4 bg-yellow-400">Shop by category</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Men's Clothing</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Women's Clothing</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Accessories</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Shoes</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Jewellery</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Bags & Backpacks</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Watches</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Dresses</li>
      <li className="bg-white text-black hover:bg-gray-100 cursor-pointer">Shirts</li>
    </ul> 
  </div>

  {/* Right Side Image */}
  <div className="flex-1 relative overflow-hidden">
  {/* Navbar */}
  <div className="w-full bg-white shadow-md relative z-20">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <ul className="flex space-x-8 text-lg font-medium text-gray-700">
        <li className="hover:text-yellow-500 cursor-pointer">Home</li>
       <a href="#features"> <li className="hover:text-yellow-500 cursor-pointer">Shop</li></a>
        <li className="hover:text-yellow-500 cursor-pointer">Pages</li>
        <Link to="/blog">
          <li className="hover:text-yellow-500 cursor-pointer">Blog</li>
        </Link>
        <li className="hover:text-yellow-500 cursor-pointer">Elements</li>
        <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition">
          Buy Now
        </button>
      </ul>
    </div>
  </div>

  
  <div className="absolute inset-0 flex flex-row items-center justify-between bg-white px-16 py-24">
  {/* Text Section */}
  <div className="max-w-md">
    <p className="text-yellow-400 text-sm font-semibold uppercase mb-2">BEST HEADPHONES</p>
    <h1 className="text-4xl font-bold text-black mb-4">WIRELESS AUDIO EXPERIENCE</h1>
    <p className="text-lg text-gray-700 mb-6">Up To 70% Off</p>
    <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded hover:bg-yellow-500 transition">
      BUY NOW
    </button>
  </div>

  {/* Image Section */}
  <img  src={Img1} alt="Headphones" className="h-80 object-contain hover:translate-y-[-2rem] duration-1000" />
</div>

</div>
</div>

     
     
     
     <p  id="features"><Cards /></p>
     
      
    </div>
  );
};

export default Sidebar;
