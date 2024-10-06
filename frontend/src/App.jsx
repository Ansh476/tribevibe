import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Pages/Layout'
import Home from './Pages/Home'
import Joiningcom from './components/Joiningcom'
import Creatingcom from './components/Creatingcom'
import Error from './components/Error'
import Login from './components/Login'
import ExploreEvents from './components/ExploreEvents'
import Dashboard from './components/Dashboard'
import CreatedComm from './components/CreatedComm'
import Createcomform from './components/Createcomfrom'
import Signup from './components/Signup'

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
        },
        {
          path: "/dashboard",   
          element: <Dashboard />
        },
        {
          path: "/communityform",   
          element: <Createcomform />
        },
        {
          path: "/created",
          element: <CreatedComm />
        },
        {
          path:"/signup",
          element:<Signup/>
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
