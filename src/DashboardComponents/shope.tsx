import Cards from '../components/cards'
import BestSellingProducts from '../components/BestSellingProducts'


const Shope = () => {
  return (
    <div className="ml-0 lg:ml-36 mt-16 lg:mt-20 p-4 lg:p-0">
        <Cards />
        <div className="bg-gray-50 py-8">
       <BestSellingProducts />
     </div>
    </div>
     
  )
}

export default Shope