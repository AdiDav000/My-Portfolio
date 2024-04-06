// import React from 'react'
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'universal-cookie';

const Login = () => {
    const cookie = new Cookies();
    const navigate = useNavigate();
    const handeLogin = async(e)=>{
        e.preventDefault();
        const result = await  Axios.post("http://localhost:3000/users/check",{
            username:e.target.elements["username"].value,
            password:e.target.elements["password"].value,
        })
        if (result.data.id != -1){
            console.log("logged in with user token - "+result.data.userToken);
            cookie.set("userToken",result.data.userToken);
            navigate("/");
        }else{
            alert("Either username or password is wrong");
            navigate("/login");
        }
        window.location.reload();
    }
  return (
    <div className='login'>
      <form className='login_form' onSubmit={handeLogin}>
        <input className='login_input' name='username' placeholder='Enter Username'></input>
        <input type="password" className='login_input' name='password' placeholder='Enter Password'></input>
        <button className='loginButton'>Login</button>
      </form>
    </div>
  )
}

export default Login
