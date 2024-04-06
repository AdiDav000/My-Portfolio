import './App.css'
import Main from './components/main'
import Header from './components/header'
import Profile from './components/Profile'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Auth/Login'
import checkSession from '../src/components/Auth/checkLogin.js'
import { useEffect, useState } from 'react'

function App() {
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const user = await checkSession();
        console.log(user.data);
        setUserToken(user.data.check);
      } catch (error) {
        console.error("Error checking session:", error);
        // Handle error if needed
      }
    }

    fetchData();
  },[]);
  const router = new createBrowserRouter([
    {
      path:"/",
      element: <><Header></Header>{userToken? <Main/>:<Login></Login>}</>,
    },
    {
      path:"/user",
      element: <><Header></Header>{userToken? <h1>Hello</h1>:<Login></Login>}</>
    },
    {
      path:"/login",
      element: <><Header></Header><Login></Login></>
    },
    {
      path:"/Profile",
      element: <><Header></Header>{userToken? <Profile></Profile>:<Login></Login>}</>
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
