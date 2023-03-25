import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function DoctorLogin () {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      // Add logic to handle login submission
      console.log('Username: ' + username)
      console.log('Password: ' + password)
      // Hit the end point login endpoint
      try {
        const res = await axios.post('http://localhost:4000/auth/login-doctor', {
            username: username,
            password: password
        },
        {
            withCredentials: true
        })
        console.log('Login Status: ' + res.statusText)
        console.log(res)
        console.log(document.cookie)
        navigate("/")
      } catch (err) {
        console.log('Error: Something went wrong')
      }
    };
      
    return (
      <>
          <form onSubmit={handleSubmit} className=' bg-secCol'>
            <h2>Doctor Login</h2>
            <div>
              <label htmlFor="email">Username:</label>
              <input
                id="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
      </>
    );
}


export default DoctorLogin