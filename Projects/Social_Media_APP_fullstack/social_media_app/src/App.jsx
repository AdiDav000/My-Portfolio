import './App.css'
import Main from './components/main'
import Header from './components/header'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

function App() {
  const router = new createBrowserRouter([
    {
      path:"/",
      element:<><Header></Header><Main/></>,
    },
    {
      path:"/user",
      element: <><Header></Header><h1>Hello</h1></>
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
