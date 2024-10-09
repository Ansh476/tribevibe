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
import Createcomform from './components/Createcomfrom'
import Signup from './components/Signup'
import CreatedComm from './components/CreatedComm'
import JoinedComm from './components/JoinedComm'
import Communitymodal from './components/Communitymodal'
import { AuthProvider } from './components/authentication/Authcontext'
import CommunityPage from './components/CommunityPage'

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
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/created",
          element:<CreatedComm/>
        },
        {
          path:"/joinedcom",
          element:<JoinedComm />
        },
        {
          path:"/community/:communityId",
          element:<Communitymodal/>
        },
        {
          path:"/view/community/:communityId",
          element:<CommunityPage/>
        },
      ],
      errorElement:<Error/>
    }
  ])

  return (
    <AuthProvider>
      <RouterProvider router={routerapp} />
    </AuthProvider>
  )
}

export default App
