import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footerdown from '../components/Footerdown'
import Footer from '../components/Footer'



const Layout = () => {
  return (
    <div>
        <Navbar />
        <Outlet/>
        <Footerdown/>
        <Footer/>

    </div>
  )
}

export default Layout