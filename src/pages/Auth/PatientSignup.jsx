import React, { useState } from 'react';

function PatientSignup () {
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
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
    
    
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Username: ' + username)
      console.log('Firstname: ' + firstname)
      console.log('Lastname: ' + lastname)
      console.log('Email: ' + email)
      console.log('Password: ' + password)
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
              <button type="submit">Sign up</button>
            </form>
        </>
    );

}

export default PatientSignup