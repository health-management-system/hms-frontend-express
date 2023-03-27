import '../App.css';

import { React, useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";

import { generalRequests } from '../utils/requests/general'
import { requestConfig } from "../utils/requests/requestConfig";

import './homepage.css';

import PageLoading from '../components/shared/PageLoading';

import Cookies from 'js-cookie'

function Homepage() {

    const [username, setUsername] = useState(Cookies.get('username'))
    const [role, setRole] = useState(Cookies.get('role'))
    const [isLoading, setLoading] = useState(false)
    const [profilePath, setProfilePath] = useState('/')
    let navigate = useNavigate()
    
    const visitProfile = () => {
        navigate(profilePath)
    }

    // Method to check if the user is a Doctor
    const getRole = () => {
      // Enter loading state
      setLoading(true)
      if (!role || !username) {
        navigate('/patient-login')
      }
      if(role == 'DOCTOR') {
        // Set path to doctorinfo page
        setProfilePath('/doctorinfo')
      } else {
        // Set path to patientinfo page
        setProfilePath('/patientinfo')
      }
      // Exit loading state
      setLoading(false)
    }

    const signOut = () => {
      Cookies.remove('username')
      Cookies.remove('role')
      setUsername('')
      setRole('')
    }

    // Use effect to check if the user is a doctor
    useEffect(() => {
      getRole()
    }, [username, role])

    // if(isLoading) {
    //   return (
    //     <PageLoading />
    //   )
    // }

    return (
          <div className="background-image">
            <div className="content">
              <b><h1 data-cy='homepage-header'>Welcome {username}</h1></b>
              <b>Choose an option</b>
              <div className='homepage-button-div'>
                <button className='home-button hover:bg-priHover' onClick={visitProfile} >My Profile</button>
                <button className='home-button hover:bg-priHover' onClick={signOut} >Sign Out</button>
              </div>
            </div>
          </div>
    );
}

export default Homepage;