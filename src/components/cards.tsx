import Img2 from '../assets/2.jpeg'
import Img3 from '../assets/3.jpeg'
import Img4 from '../assets/4.jpeg'
import Img5 from '../assets/5.jpeg'
import Img6 from '../assets/6.jpeg'
import Img7 from '../assets/7.jpeg'
import Img8 from '../assets/8.jpeg'
import Img9 from '../assets/9.jpeg'

// 🔹 Cards Component
const Cards = () => {
  return (
    <div className="space-y-12">
      
      {/* 🔹 Sliding Banner Section */}
      <div className="overflow-hidden">
        <div className="flex animate-slideLeft whitespace-nowrap">
          <div className="flex flex-row gap-8 bg-white p-8">
            
            {/* Card 1 */}
            <div className="flex justify-between items-center bg-gray-100 p-12 rounded-lg shadow-md w-80">
              <div>
                <p className="text-yellow-400">Digital Smart</p>
                <h2 className="font-semibold text-lg">iPhone 16</h2>
                <p className="font-semibold">MIN: 30-70% OFF</p>
                <button className="font-semibold bg-yellow-400 text-black rounded-md px-4 py-2 mt-2 hover:bg-yellow-500">
                  SHOP NOW
                </button>
              </div>
              <img src={Img2} alt="Product" className="rounded-lg w-32" />
            </div>

            {/* Card 2 */}
            <div className="flex justify-between items-center bg-gray-100 p-12 rounded-lg shadow-md w-80">
              <div>
                <p className="text-yellow-400">Digital Smart</p>
                <h2 className="font-semibold text-lg">iPhone 16</h2>
                <p className="font-semibold">MIN: 30-70% OFF</p>
                <button className="font-semibold bg-yellow-400 text-black rounded-md px-4 py-2 mt-2 hover:bg-yellow-500">
                  SHOP NOW
                </button>
              </div>
              <img src={Img4} alt="Product" className="rounded-lg w-32" />
            </div>

          </div>
        </div>
      </div>

      {/* 🔹 Deals + Featured Products Section */}
      <div className="flex flex-row gap-12 pl-12">
        
        {/* Left Deal Card */}
        <div className="border border-yellow-400 p-8 pb-12 rounded-lg shadow-md w-96">
          <h1 className="underline decoration-yellow-500 font-semibold text-lg">Hot deals</h1>
          <img src={Img3} alt="Product" className="rounded-lg w-full h-80 " />
          <p className="mt-2 text-gray-600">Electronics</p>
          <p className="font-medium">Apple Watch Series</p>
          <span className="font-bold">$499.00 - $599.00</span>
        </div>

        {/* Featured Products */}
        <div className="flex-1">
          <div className="flex flex-row justify-between items-center mb-6">
            <h1 className="font-semibold underline decoration-yellow-500 text-lg">Featured Products</h1>
            <button className="bg-yellow-500 black-white px-5 py-2 rounded-lg hover:bg-yellow-600 transition">
              VIEW ALL
            </button>
          </div>

          {/* Grid for Featured Products */}
          <div className="grid grid-cols-3 gap-6 pr-8">
            {[Img4, Img5, Img6, Img7, Img8, Img9].map((img, index) => (
              <div key={index} className="border border-yellow-400 p-4 rounded-lg shadow-sm">
                
                <img src={img} alt="Product" className="rounded-sm w-full h-32 object-cover" />
                <p className="mt-2 text-gray-600">Electronics</p>
                <p className="font-medium">Apple Watch Series</p>
                <span className="font-bold">$499.00 - $599.00</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Cards
