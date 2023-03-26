import React, { useState,useEffect } from 'react';
import { useNavigate,Link  } from "react-router-dom";
import axios from 'axios'
import "./signup.css";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

function PatientSignup () {
  const[inputField,setInputField]=useState({UserName:"",FirstName:"",LastName:"",Email:"",Password:"",ConfirmPassword:""})
  const[button_true,setButtonState]=useState(true)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  
    const handleSubmit = async(event) => {
      setLoading(true)
      event.preventDefault();
        
        // Console log
        console.log('Username: ' + inputField.UserName)
        console.log('Firstname: ' + inputField.FirstName)
        console.log('Lastname: ' + inputField.LastName)
        console.log('Email: ' + inputField.Email)
        console.log('Password: ' + inputField.Password)
        console.log('Confirm Password: ' + inputField.ConfirmPassword) 
        
        try {
            // Hit the endpoint
            const res = await axios.post('http://localhost:4000/auth/register-patient', {
                username: inputField.UserName,
                firstname: inputField.FirstName,
                lastname: inputField.LastName,
                email: inputField.Email,
                password: inputField.Password,
                confirmPassword: inputField.ConfirmPassword
            })
            console.log('Registration Status: ' + res.statusText)
            setLoading(false)
            navigate("/patient-login")
            
        } catch (err) {
            console.log('Error: Something went wrong')
            setLoading(false)
        }
    };
    
    useEffect(()=>{
      if (inputField.FirstName.length >2 && inputField.LastName.length>2 && inputField.UserName.length >4 && inputField.Email.length>5 && inputField.Password.length>1 && inputField.ConfirmPassword>1 && inputField.Password === inputField.ConfirmPassword){
          setButtonState(false)
      }
      else{setButtonState(true)}
  },[inputField.UserName,inputField.Email,inputField.Password,inputField.ConfirmPassword,inputField.FirstName,inputField.LastName])
  
    

    return (
      <div className="parent2">
      <div className="child2">
          <img src={require("../../assets/user_1.png")} alt="random_image" className="image2"/>
          <form onSubmit={handleSubmit}>                
              <p>First Name:</p>
              <input className="inputclass" name="FirstName" type="text" value={inputField.FirstName} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Enter firstName"/>
              <p>Last Name:</p>
              <input className="inputclass" name="LastName" type="text" value={inputField.LastName} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Enter LastName"/>
              <p>User Name:</p>
              <input  className="inputclass" name="UserName" type="text" value={inputField.UserName} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Enter Username"/>
              <p>Email:</p>
              <input  className="inputclass" name="Email" type="email" value={inputField.Email} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Enter Email"/>
              <p>Password:</p>
              <input className="inputclass" name="Password" type="password" value={inputField.Password} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Enter Passowrd"/>
              <p>Confirm Password:</p>
              <input className="inputclass" name="ConfirmPassword" type="password" value={inputField.ConfirmPassword} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Confrim Password"/>
              <br></br>
              <button type="submit" disabled={button_true}>{loading ? <div className='flex space-x-3 justify-center items-center'><AiOutlineLoading3Quarters className="animate-spin text-white" /><h1>Loading</h1></div>:<span>Submit</span>}</button>
          </form>
          <div>Have an account? <Link to="/patient-login" className="nav-item hover:cursor-pointer hover:text-sky-700 hover:font-bold">Sign in</Link> </div>
          
         
          {/* <Link to="/forgotpassword" className="nav-item">Forgot password?</Link> */}
      </div>
  </div>
    );

}

export default PatientSignup