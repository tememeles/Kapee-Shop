import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'

import Footer from './components/Footer'
import Footerdown from './components/Footerdown'
import Layout from './layout/Layout'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/footer" element={<Footer />} />
          <Route path="/footerdown" element={<Footerdown />} />
          
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
