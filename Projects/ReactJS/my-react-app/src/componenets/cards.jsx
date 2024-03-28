import React, { useEffect, useState } from 'react'
import './card.css'

const Card = (props) => {
    const [count, setCount] = useState(0);
    const [showCard, setShowCard] = useState(false);
    const [items,setItems] = useState([
        {
            id: 1,
            title:"abc",
            desc:"xyz",
        },
        {
            id:2,
            title:"adc",
            desc:"zyx",
        }
    ]);
    // useEffect(()=>{
    //     alert("Hey");
    //   },[count])
    const Item = ({item})=>{
        return (
            <>
                <h1>{item.title}</h1>
                <h1>{item.desc}</h1>
            </>
        )
    }
  return (
    <>
    <button style={{height: '30px', backgroundColor: 'crimson', border: 'none', padding: '5px',
 borderRadius: '10px', color:'whitesmoke'}} onClick={()=>{setShowCard(!showCard)}}>Click me</button>
    {items.map((item)=>{
        return (<Item item={item}></Item>
        )
    })}
    {showCard? 
    <div className='card' onClick={()=>{setCount(count+1)}}>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <p>{count}</p>
    </div>: <div></div>}
    </>
  )
}

export default Card
