import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function PatientSignup () {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleFirstnameChange = (e) => {
        setFirstname(e.target.value);
    }

    const handleLastnameChange = (e) => {
        setLastname(e.target.value);
    }
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        // Console log
        console.log('Username: ' + username)
        console.log('Firstname: ' + firstname)
        console.log('Lastname: ' + lastname)
        console.log('Email: ' + email)
        console.log('Password: ' + password)
        console.log('Confirm Password: ' + confirmPassword) 
        
        try {
            // Hit the endpoint
            const res = await axios.post('http://localhost:4000/auth/register-patient', {
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                confirmPassword: confirmPassword
            })
            console.log('Registration Status: ' + res.statusText)
            navigate("/patient-login")
        } catch (err) {
            console.log('Error: Something went wrong')
        }
    };
    
    return (
        <>
            <form onSubmit={handleSubmit} className=' bg-secCol'>
              <h2>Patient Signup</h2>
              <div>
                <label>Username:</label>
                <input
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div>
                <label>First Name:</label>
                <input
                  id="firstname"
                  value={firstname}
                  onChange={handleFirstnameChange}
                />
              </div>
              <div>
                <label>Last Name:</label>
                <input
                  id="lastname"
                  value={lastname}
                  onChange={handleLastnameChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
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
              <div>
                <label htmlFor="password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirmpassword"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              <button type="submit">Sign up</button>
            </form>
        </>
    );

}

export default PatientSignup