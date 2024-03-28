import React, { useState } from 'react'
import './card.css'

const Card = (props) => {
    const [count, setCount] = useState(0);
  return (
    <div className='card' onClick={()=>{setCount(count+1)}}>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <p>{count}</p>
    </div>
  )
}

export default Card
