import React, { useContext } from 'react'
import { counterContext } from './context';

const Button = () => {
  const value = useContext(counterContext);
  return (
    <div>
      <button onClick={()=>{value.setCount(value.count+1)}}>Hello</button>
      <p>{value.count}</p>
    </div>
  )
}

export default Button
