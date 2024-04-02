import './App.css'
import Main from './components/main'
import Header from './components/header'
import Profile from './components/Profile'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Login from './components/Auth/Login'

function App() {
  const router = new createBrowserRouter([
    {
      path:"/",
      element:<><Header></Header><Main/></>,
    },
    {
      path:"/user",
      element: <><Header></Header><h1>Hello</h1></>
    },
    {
      path:"/login",
      element: <><Header></Header><Login></Login></>
    },
    {
      path:"/Profile",
      element: <><Header></Header><Profile></Profile></>
    }
  ])
  return (
    <>
    {/* <Header></Header> */}
    <RouterProvider router={router}/>
      {/* <Main></Main> */}
    </>
  )
}

export default App
