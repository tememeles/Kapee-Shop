import Img2 from '../assets/2.jpeg';
import Img3 from '../assets/3.jpeg';
import Img4 from '../assets/4.jpeg';
import { ProductCardsDisplay } from "./productCards";

const Cards = () => {
  return (
    <div className="space-y-6 sm:space-y-8 md:space-y-12">
      
      {/* Horizontal Scroll Cards Section */}
      <div className="overflow-hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex flex-row gap-4 sm:gap-6 md:gap-8 bg-white p-4 sm:p-6 md:p-12 ml-4 sm:ml-8 md:ml-28 min-w-max">

            {/* Card 1 - Wireless Speaker */}
            <div className="group flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 sm:p-6 md:p-10 rounded-lg shadow-md w-72 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-[22rem] overflow-hidden flex-shrink-0">
              <div className="z-10 text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-yellow-400 text-xs sm:text-sm uppercase">Digital Smart</p>
                <h2 className="font-semibold text-lg sm:text-xl">Wireless Speaker</h2>
                <p className="font-semibold text-sm sm:text-base">MIN. 30–75% OFF</p>
                <button className="font-semibold bg-yellow-400 text-black rounded-md px-3 sm:px-4 py-1.5 sm:py-2 mt-2 sm:mt-4 hover:bg-yellow-500 text-sm sm:text-base">
                  SHOP NOW
                </button>
              </div>
              <div className="overflow-hidden w-32 sm:w-48 md:w-[16rem] h-32 sm:h-48 md:h-full flex justify-center items-center">
                <img
                  src={Img2}
                  alt="Wireless Speaker"
                  className="rounded-lg w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
            </div>

            {/* Card 2 - Watch Charger */}
            <div className="group flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-4 sm:p-6 md:p-10 rounded-lg shadow-md w-72 sm:w-80 md:w-[28rem] h-64 sm:h-80 md:h-[22rem] overflow-hidden flex-shrink-0">
              <div className="z-10 text-center sm:text-left mb-4 sm:mb-0">
                <p className="text-yellow-400 text-xs sm:text-sm uppercase">Digital Smart</p>
                <h2 className="font-semibold text-lg sm:text-xl">Watch Charger</h2>
                <p className="font-semibold text-sm sm:text-base">UP TO 75% OFF</p>
                <button className="font-semibold bg-yellow-400 text-black rounded-md px-3 sm:px-4 py-1.5 sm:py-2 mt-2 sm:mt-4 hover:bg-yellow-500 text-sm sm:text-base">
                  SHOP NOW
                </button>
              </div>
              <div className="overflow-hidden w-32 sm:w-48 md:w-[16rem] h-32 sm:h-48 md:h-full flex justify-center items-center">
                <img
                  src={Img4}
                  alt="Watch Charger"
                  className="rounded-lg w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Hot Deals and Featured Products Section */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 md:px-12">
        
        {/* Left Deal Card */}
        <div className="border-4 border-yellow-400 p-4 sm:p-6 rounded-xl shadow-lg w-full max-w-sm mx-auto lg:mx-0 lg:w-96 bg-white hover:shadow-2xl transition-shadow duration-300">
          <h1 className="text-lg sm:text-xl font-bold text-yellow-600 mb-3 sm:mb-4 underline decoration-yellow-500">🔥 Hot Deals</h1>
          
          <div className="relative group mb-3 sm:mb-4">
            <img 
              src={Img3} 
              alt="Apple Watch Series" 
              className="rounded-xl w-full h-48 sm:h-64 md:h-80 object-cover transform group-hover:-translate-y-2 sm:group-hover:-translate-y-4 transition duration-500" 
            />
            <span className="absolute top-1 sm:top-2 left-1 sm:left-2 bg-yellow-500 text-white text-xs font-semibold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
              Limited Stock
            </span>
          </div>

          <div className="mb-3 sm:mb-4">
            <p className="text-xs sm:text-sm text-gray-500">
              Category: <span className="text-gray-700 font-medium">Electronics</span>
            </p>
            <p className="text-base sm:text-lg font-semibold text-gray-800 mt-1">Apple Watch Series</p>
            <p className="text-lg sm:text-xl font-bold text-yellow-600 mt-2">$499.00 - $599.00</p>
          </div>

          {/* Sales Progress Bar */}
          <div className="mt-4 sm:mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs sm:text-sm font-medium text-yellow-700">Sold: 75%</span>
              <span className="text-xs sm:text-sm text-gray-500">150/200 units</span>
            </div>
            <div className="w-full bg-gray-300 rounded-full h-2 sm:h-3">
              <div 
                className="bg-yellow-400 h-2 sm:h-3 rounded-full transition-all duration-500" 
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>

          {/* Call to Action */}
          <button className="mt-4 sm:mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 text-sm sm:text-base">
            Buy Now
          </button>
        </div>

        {/* Featured Products */}
        <div className="flex-1 mt-6 lg:mt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-3 sm:gap-0">
            <h1 className="font-semibold underline decoration-yellow-500 text-base sm:text-lg">Featured Products</h1>
            <button className="bg-yellow-500 text-white px-4 sm:px-5 py-2 rounded-lg hover:bg-yellow-600 transition text-sm sm:text-base w-full sm:w-auto">
              VIEW ALL
            </button>
          </div>

          <div>
            <ProductCardsDisplay />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cards;