import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Joiningcom from './components/Joiningcom'
import Creatingcom from './components/Creatingcom'
import Error from './components/Error'
import Login from './components/Login'
import ExploreEvents from './components/ExploreEvents'
// import Signup from './components/Signup'

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
        {
          path:"/joincom",
          element:<Joiningcom/>
        },
        {
          path:"/createcom",
          element:<Creatingcom/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path: "/explore",   
          element: <ExploreEvents />
        }
        // {
        //   path:"/signup",
        //   element:<Signup/>
        // },
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
