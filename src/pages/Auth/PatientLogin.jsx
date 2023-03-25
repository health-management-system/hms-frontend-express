import React, { useState } from 'react';

function PatientLogin () {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Add logic to handle login submission
      console.log('Username: ' + username)
      console.log('Password: ' + password)
    };
    
    return (
      <>
          <form onSubmit={handleSubmit} className=' bg-secCol'>
            <h2>Patient Login</h2>
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

export default PatientLogin