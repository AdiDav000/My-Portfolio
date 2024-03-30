import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/main'
import Header from './components/header'
import Axios from 'axios';

function App() {
  return (
    <>
      <Header></Header>
      <Main></Main>
    </>
  )
}

export default App
