import Kapee from '../assets/kapee.png'
import { FaSearch } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { IoBagOutline } from "react-icons/io5";
import { MdOutlinePerson3 } from "react-icons/md";
import Img1 from '../assets/earphone.png'
import Cards from '../components/cards'



const Sidebar = () => {
  
   
  return (
    <div>

      <div  className="flex flex-row justify-between">
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
          <button className="pr-6"><MdOutlinePerson3 className="w-12 h-7"/> Hello SIGN IN</button>
          <button  className="pr-6"><FcLike/></button>
          <button  className="pr-6"><IoBagOutline/>cart $0.00</button>
      </div>




  <div className="flex">
  {/* Left Sidebar */}
  <div className="w-64 min-h-screen border-r border-black pl-8 pt-4">
    <ul className="space-y-2 p-4 divide-y">
      <li className="text-xl font-bold text-black bg-yellow-400">Shop by category</li>
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
        <li className="hover:text-yellow-500 cursor-pointer">Shop</li>
        <li className="hover:text-yellow-500 cursor-pointer">Pages</li>
        <li className="hover:text-yellow-500 cursor-pointer">Blog</li>
        <li className="hover:text-yellow-500 cursor-pointer">Elements</li>
        <button className="bg-yellow-500 text-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition">
          Buy Now
        </button>
      </ul>
    </div>
  </div>

  
  <div className="absolute inset-0 flex flex-row bg-gray-100 pt-48 ">
    <div className="m-12 pb-12">
      <p className="text-yellow-400 pb-12">BEATS EP ON-EAR</p>
      <h1 className="text-4xl pb-12">PERSONALIZED HEADPHONES</h1>
      <p>MIN. 40-80$ OFF</p>
      <button className="bg-yellow-400 w-20 rounded">BUY NOW</button>
    </div>
    <img src={Img1} alt="" className="h-64 object-contain" />
  </div>
</div>
</div>

     <Cards/>
      
    </div>
  );
};

export default Sidebar;
