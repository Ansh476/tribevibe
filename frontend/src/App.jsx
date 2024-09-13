import React from 'react'
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Joincom from './pages/Joincom'
import Createcom from './pages/Createcom'
import Nopage from './pages/Nopage'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/joincom' element={<Joincom/>}/>
            <Route path='/createcom' element={<Createcom/>}/>
            <Route path='*' element={<Nopage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App


