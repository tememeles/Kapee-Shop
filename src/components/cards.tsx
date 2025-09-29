import Img2 from '../assets/2.jpeg'
import Img3 from '../assets/3.jpeg'
import Img4 from '../assets/4.jpeg'
import { ProductCardsDisplay } from "./productCards"

// 🔹 Cards Component
const Cards = () => {
  return (
    <div className="space-y-12">
      
      
       <div className="overflow-hidden ">
  <div className="flex whitespace-nowrap">
    <div className="flex flex-row gap-8 bg-white p-12 ml-28 w-screen">

      {/* Card 1 - Wireless Speaker */}
      <div className="group flex justify-between items-center bg-gray-100 p-10 rounded-lg shadow-md w-[28rem] h-[22rem] overflow-hidden">
        <div className="z-10">
          <p className="text-yellow-400 text-sm uppercase">Digital Smart</p>
          <h2 className="font-semibold text-xl">Wireless Speaker</h2>
          <p className="font-semibold text-base">MIN. 30–75% OFF</p>
          <button className="font-semibold bg-yellow-400 text-black rounded-md px-4 py-2 mt-4 hover:bg-yellow-500">
            SHOP NOW
          </button>
        </div>
        <div className="overflow-hidden w-[16rem] h-full flex justify-center items-center">
          <img
            src={Img2} // Replace with actual speaker image
            alt="Wireless Speaker"
            className="rounded-lg w-[16rem] h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
      </div>

      {/* Card 2 - Watch Charger */}
      <div className="group flex justify-between items-center bg-gray-100 p-10 rounded-lg shadow-md w-[28rem] h-[22rem] overflow-hidden">
        <div className="z-10">
          <p className="text-yellow-400 text-sm uppercase">Digital Smart</p>
          <h2 className="font-semibold text-xl">Watch Charger</h2>
          <p className="font-semibold text-base">UP TO 75% OFF</p>
          <button className="font-semibold bg-yellow-400 text-black rounded-md px-4 py-2 mt-4 hover:bg-yellow-500">
            SHOP NOW
          </button>
        </div>
        <div className="overflow-hidden w-[16rem] h-full flex justify-center items-center">
          <img
            src={Img4} // Replace with actual watch charger image
            alt="Watch Charger"
            className="rounded-lg w-[16rem] h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </div>
      </div>

    </div>
  </div>
</div>




      
      <div className="flex flex-row gap-12 pl-12">
        
        {/* Left Deal Card */}
        <div className="border-yellow-400 border-4 p-8 rounded-lg shadow-md w-96 h-[45rem]">
          <h1 className="underline decoration-yellow-500 font-semibold text-lg mb-4">Hot deals</h1>
          <img src={Img3} alt="Product" className="rounded-lg w-full h-80 hover:translate-y-[-2rem] duration-700 mb-4" />
          <p className="mt-2 text-gray-600 mb-2">Electronics</p>
          <p className="font-medium mb-2">Apple Watch Series</p>
          <span className="font-bold mb-4 block">$499.00 - $599.00</span>
          
          {/* Sales Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-yellow-700">Sold: 75%</span>
              <span className="text-sm text-gray-500">150/200</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="flex-1">
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="font-semibold underline decoration-yellow-500 text-lg">Featured Products</h1>
            <button className="bg-yellow-500 black-white px-5 py-2 rounded-lg hover:bg-gray-600 transition">
              VIEW ALL
            </button>
          </div>

          <div>
              <ProductCardsDisplay />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cards
