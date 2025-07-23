

import { Outlet } from 'react-router'
import  Navbar  from './components/layout/Navber'
import Footer from './components/layout/Footer'
  import { ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
     <ToastContainer />
   <Navbar/>
   <Outlet/>
   <Footer/>
    </>
  )
}

export default App
