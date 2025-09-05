import { RiFacebookBoxFill } from "react-icons/ri";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { TiSocialYoutubeCircular } from "react-icons/ti";
import { FaLinkedin } from "react-icons/fa";


const Footerdown = () => {
  return (
    <div className="flex flex-row pl-8 text-sm bg-gray-50 pt-24 pb-20 text-gray-600 ">
      <div className="pl-8">
        <h1 className="from-neutral-900 font-serif text-6xl font-bold w-30 pt-3 py-5 text-black">Kapee</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora beatae ea id cumque reprehenderit temporibus sunt inventore error assumenda quos!</p>
        <p>location</p>
        <p>ph-number</p>
        <p>info-email</p>
        <p><Date/></p>
    </div>

    <div className="pl-8 py-5">
        <h1 className="text-lg w-30 font-semibold text-black">INFORMATION</h1>
        <p>About us</p>
        <p>Store Location</p>
        <p>Contact us</p>
        <p>Shipping & Delivery</p>
        <p>Latest News</p>
        <p>Our Sitemap</p>
    </div>
    
    <div className="pl-8 py-5">
        <h1 className="text-lg w-36 font-semibold text-black">OUR SERVICE</h1>
        <p>Privacy Policy</p>
        <p>Terms of sale</p>
        <p>Customer service</p>
        <p>Delivery information</p>
        <p>Payments</p>
        <p>Saved cards</p>
    </div>

    <div className="pl-8 py-5">
        <h1 className="text-lg w-48 font-semibold text-black">MY ACCOUNT</h1>
        <p>My account</p>
        <p>My shope</p>
        <p>My cart</p>
        <p>Checkout</p>
        <p>My wishlist</p>
        <p>Tracking order</p>
    </div>

    <div className="pl-12 pr-12 pt-4">
        <p>Subscribe to our mailing list to get the new updates</p>
        <div className="flex flex-row">
          <input type="text" placeholder="Your email address" />
          <button className="text-yellow-400 bg-black w-16 h-8">SIGN UP</button>
        </div>
        <div className="flex flex-row mt-8 pl-8 text-3xl"><RiFacebookBoxFill />
        <FaXTwitter />
        <FaInstagramSquare />
        <TiSocialYoutubeCircular />
        <FaLinkedin />



        </div>
    
    
    </div>
    </div>
  )
}

export default Footerdown