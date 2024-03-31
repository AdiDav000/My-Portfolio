import './App.css'
import Main from './components/main'
import Header from './components/header'
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
