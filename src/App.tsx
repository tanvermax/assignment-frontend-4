

import { Outlet } from 'react-router'
import  Navbar  from './components/layout/Navber'

function App() {

  return (
    <>
   <Navbar/>
   <Outlet/>
    </>
  )
}

export default App
