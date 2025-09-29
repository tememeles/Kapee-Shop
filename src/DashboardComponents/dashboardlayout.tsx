import {Outlet} from 'react-router-dom'
import Navbar from "../DashboardComponents/dashboardnavbar"
import Sidebar from "../DashboardComponents/sidebar"


const Layout2 = () => {
  return (
    <div>
        
        <Navbar />
        <Sidebar />
        <Outlet/>
        

    </div>
  )
}

export default Layout2