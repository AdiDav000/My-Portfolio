import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './card.css'

const Card = (props) => {
    const [count, setCount] = useState(0);
    const [showCard, setShowCard] = useState(false);
    const [items,setItems] = useState([]);
    const fetchPost= async ()=>{
        const res = await Axios.get("https://api.publicapis.org/entries");
        setItems(res.data.entries);
    }
    useEffect(()=>{
        // Axios.get("https://api.publicapis.org/entries").then(
        //     (res)=>{
        //         setItems(res.data.entries);
        //     }
        // )
        fetchPost();
      },[])
    const Item = ({item})=>{
        return (
            <div className='list'>
                <h1>{item.API}</h1>
            </div>
        )
    }
  return (
    <>
    <button style={{height: '30px', backgroundColor: 'crimson', border: 'none', padding: '5px',
 borderRadius: '10px', color:'whitesmoke'}} onClick={()=>{setShowCard(!showCard)}}>Click me</button>
    {items.map((item)=>{
        // console.log(items[0]);
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
