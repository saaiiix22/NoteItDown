import React from "react"
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import "./index.css"
import Root from "./Root"
import Login from "./components/01_login/Login"
import Signup from "./components/02_signup/Signup"
import Dashboard from "./components/03_dashboard/Dashboard"
import DefaultPage from "./components/DefaultPage/DefaultPage"
import Forget from "./components/05_forgetPassword/Forget"
import CreateNote from "./components/createNote/CreateNote"
import UpdateNote from "./components/updateNote/UpdateNote"

function App() {

  const route = createBrowserRouter([
    {
      path:"/",
      element:<Root/>,
      children:[
        {
          index:true,
          element:<DefaultPage/>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/signup",
          element:<Signup/>
        },
        {
          path:"/forget",
          element:<Forget/>
        },
        {
          path:"/dashboard",
          element:<Dashboard/>
        },
        {
          path:"/create-note",
          element:<CreateNote/>
        },
        {
          path:"/update-note/:id",
          element:<UpdateNote/>
        }
      ]
    }
  ])

  return (
   <>
      <RouterProvider router={route}/>
   </>
  )
}

export default App
