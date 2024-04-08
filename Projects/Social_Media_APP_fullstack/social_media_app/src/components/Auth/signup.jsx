import Axios from 'axios'
import React from 'react'
import './signup.css'
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate();
    const createUser= async(e)=>{
      e.preventDefault();
        if(e.target.elements["password"].value == e.target.elements["confirmpassword"].value){
            try{
                const response = await Axios.post("http://localhost:3000/users/new",{
                    username: e.target.elements["username"].value,
                    password: e.target.elements['password'].value,
                })
                console.log(response);
                if(response.data.code == 0){
                  alert("account created successfully");
                  navigate("/login");
                }else if(response.data.code==1){
                  alert("account already exists");
                  navigate("/login");
                }else{
                  alert("some unkown error occurred");
                }
            }catch(e){
                alert("Some error occurred");
            }
        }else{
            alert("Passwords do not match");
        }
    }
  return (
      <div className='login'>
      <form className='login_form signup' onSubmit={createUser}>
        <input className='login_input' name='username' placeholder='Enter Username'></input>
        <input type="password" className='login_input' name='password' placeholder='Enter Password'></input>
        <input type="password" className='login_input' name='confirmpassword' placeholder='Confirm Password'></input>
        <button className='loginButton'>Signup</button>
        <p>Already have an account?<button className="signupbutton" onClick={(e)=>{e.preventDefault();navigate("/login")}}>Login</button></p>
      </form>
    </div>
  )
}

export default Signup
