import React, { useState,useEffect } from 'react';
import axios from 'axios'
import { useNavigate,Link } from "react-router-dom";
import "./login.css";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

function DoctorLogin () {
    const[inputField,setInputField]=useState({UserName:"",Password:""})
    const[button_true,setButtonState]=useState(true)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    
    const handleSubmit = async(event) => {
    setLoading(true)
    event.preventDefault();
      // Add logic to handle login submission
      console.log('Username: ' + inputField.UserName)
      console.log('Password: ' + inputField.Password)
      // Hit the end point login endpoint
      try {
        const res = await axios.post('http://localhost:4000/auth/login-doctor', {
            username: inputField.UserName,
            password: inputField.Password
        },
        {
            withCredentials: true
        })
        console.log('Login Status: ' + res.statusText)
        console.log(res)
        console.log(document.cookie)
        setLoading(false)
        setInputField({UserName:"",Password:""})
        navigate("/")
      } catch (err) {
        setLoading(false)
        console.log('Error: Something went wrong')
      }
    };

    useEffect(()=>{
        setButtonState(false)
    },[inputField.UserName,inputField.Password,])

    return (
        <div className="parent">
            <div className="child">
            <img src={require("../../assets/user_1.png")} alt="random_image" className="image"/>
                <form onSubmit={handleSubmit} id="form_login">                
                    <p>User Name:</p>
                    <input className='login-input' name="UserName" type="text" value={inputField.UserName} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Enter Username"/>
                    <p>Password:</p>
                    <input className='login-input' name="Password" type="password" value={inputField.Password} onChange={(event)=>setInputField({...inputField, [event.target.name]: event.target.value})} placeholder="Enter Passowrd"/>
                    <br></br>
                    <div>
                        <button type="submit" disabled={button_true}>{loading ? <div className='flex space-x-3 justify-center items-center'><AiOutlineLoading3Quarters className="animate-spin text-white" /><h1>Loading</h1></div>:<span>Submit</span>}</button>
                    </div>
                </form>
                <div> Don't have an account? <Link to="/patient-signup" className="nav-item hover:cursor-pointer hover:text-sky-700 hover:font-bold"> Register</Link> </div> 
                <div> Patient login: <Link to="/patient-login" className="nav-item hover:cursor-pointer hover:text-sky-700 hover:font-bold">click here</Link> </div>
            </div>    
        </div> 
    );
}


export default DoctorLogin