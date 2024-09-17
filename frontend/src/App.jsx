import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Joiningcom from './components/Joiningcom'
import Creatingcom from './components/Creatingcom'
import Error from './components/Error'

function App() {
  const routerapp = createBrowserRouter([
    {
      path:"/",
      element:<Layout/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        // {
        //   path:"/about",
        //   element:<About/>
        // },
        {
          path:"/joincom",
          element:<Joiningcom/>
        },
        {
          path:"/createcom",
          element:<Creatingcom/>
        },
      ],
      errorElement:<Error/>
    }
  ])

  return (
    <>
    <RouterProvider router={routerapp}></RouterProvider>
    </>
  )
}

export default App
