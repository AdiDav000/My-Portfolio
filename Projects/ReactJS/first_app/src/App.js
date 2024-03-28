// import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

function App() {
  const [value, setValue]=useState(0);
  return (
   <div className="App">{value}
   <button onClick={()=>{setValue(value+1);}}>Click</button></div>
  );
}

export default App;
