import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [text,setText] = useState("");
  const [btnClasses,setBtnClasses] = useState(['red']);
  const [form, setForm]= useState({
    id:1,
    title:2,
  });

  const handleClick = ()=>{
    alert("Clicked");
  }
  const handleMouseOver= ()=>{
    // alert(btnClasses.join(" "));
    setBtnClasses([...btnClasses, 'green']);
    console.log(btnClasses);
  }
  const handlInput = (e)=>{
    // setText(e);
    // console.log(text);
    setForm({...form, [e.target.name]:e.target.value});
    //        this spread operator used to keep rest(other) values same, and add new properties after the spread operator
  }
  return (
    <>
      <div className='button'>
        <button onClick={()=>{handleClick()}}>click me</button>
        <div className={btnClasses.join(" ")} onMouseOver={handleMouseOver}>I am a red div</div>
        <label>ABC</label>
        <input type='text' name='email' onChange={handlInput}></input>
        <input type='text' name='pass' onChange={handlInput}></input>
        <p>{form.email}:{form.pass}:{form.id}</p>
      </div>
    </>
  )
}

export default App
