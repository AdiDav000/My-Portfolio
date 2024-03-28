import { useState ,useEffect} from 'react'
import './App.css'
import NavBar from './componenets/Navbar'
import Card from './componenets/cards'

function App() {
  const [count, setCount] = useState(0)


  return (
    <>
     <NavBar></NavBar>
     <div className='cards'>
      <Card title="First card" desc="THis is a sample description"/>
      <Card title="second card" desc="THis is a sample desc 2"/>
      <Card title="third card" desc="THis is a description"/>
      <Card title="4th card" desc="THis is a COOL description"/>
      </div>
    </>
  )
}

export default App
