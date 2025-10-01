import { RiFacebookBoxFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa";


const Footerdown = () => {
  return (
    <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:pl-8 text-sm bg-gray-50 pt-12 sm:pt-16 lg:pt-24 pb-12 sm:pb-16 lg:pb-20 text-gray-600 gap-8 lg:gap-0">
      <div className="lg:pl-8 max-w-sm">
        <h1 className="from-neutral-900 font-serif text-3xl sm:text-4xl lg:text-6xl font-bold pt-3 py-5 text-black">Kapee</h1>
        <p className="mb-3 sm:mb-4 leading-relaxed">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora beatae ea id cumque reprehenderit temporibus sunt inventore error assumenda quos!</p>
        <p className="mb-1">location</p>
        <p className="mb-1">ph-number</p>
        <p className="mb-1">info-email</p>
        <p><Date/></p>
    </div>

    <div className="lg:pl-8 py-3 lg:py-5">
        <h1 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">INFORMATION</h1>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">About us</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Store Location</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Contact us</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Shipping & Delivery</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Latest News</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Our Sitemap</p>
    </div>
    
    <div className="lg:pl-8 py-3 lg:py-5">
        <h1 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">OUR SERVICE</h1>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Privacy Policy</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Terms of sale</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Customer service</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Delivery information</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Payments</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Saved cards</p>
    </div>

    <div className="lg:pl-8 py-3 lg:py-5">
        <h1 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">MY ACCOUNT</h1>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">My account</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">My shope</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">My cart</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Checkout</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">My wishlist</p>
        <p className="mb-2 hover:text-yellow-500 cursor-pointer transition-colors">Tracking order</p>
    </div>

    <div className="lg:pl-12 lg:pr-12 pt-4 max-w-sm lg:max-w-none">
        <p className="mb-4 text-sm sm:text-base">Subscribe to our mailing list to get the new updates</p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 mb-6">
          <input 
            type="text" 
            placeholder="Your email address" 
            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          />
          <button className="text-yellow-400 bg-black px-4 py-2 rounded-r-md sm:rounded-l-none hover:bg-gray-800 transition-colors text-sm font-medium">
            SIGN UP
          </button>
        </div>
        <div className="flex flex-row gap-3 sm:gap-4 text-2xl sm:text-3xl justify-center lg:justify-start">
          <RiFacebookBoxFill className="hover:text-yellow-500 cursor-pointer transition-colors" />
          <FaXTwitter className="hover:text-yellow-500 cursor-pointer transition-colors" />
          <FaInstagramSquare className="hover:text-yellow-500 cursor-pointer transition-colors" />
          <TiSocialYoutubeCircular className="hover:text-yellow-500 cursor-pointer transition-colors" />
          <FaLinkedin className="hover:text-yellow-500 cursor-pointer transition-colors" />



        </div>
    
    
    </div>
    </div>
  )
}

export default Footerdown