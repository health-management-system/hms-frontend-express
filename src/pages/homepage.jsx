import '../App.css';

import { React, useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";

import { generalRequests } from '../utils/requests/general'
import { requestConfig } from "../utils/requests/requestConfig";

import './homepage.css';

import PageLoading from '../components/shared/PageLoading';

function Homepage() {

    const username = user.username
    const [isLoading, setLoading] = useState(false)
    const [profilePath, setProfilePath] = useState('/')
    let navigate = useNavigate()
    
    const visitProfile = () => {
        navigate(profilePath)
    }

    // Method to check if the user is a Doctor
    const isDoctor = async(username) => {
      // Enter loading state
      setLoading(true)
      // Request: Is user of role doctor 
      const isDoctor = await generalRequests(requestConfig).isDoctor(username)
      console.log('Is Doctor: ' + isDoctor)
      // Navigate user
      if(isDoctor) {
        // Set path to doctorinfo page
        setProfilePath('/doctorinfo')
      } else {
        // Set path to patientinfo page
        setProfilePath('/patientinfo')
      }
      // Exit loading state
      setLoading(false)
    }

    // Use effect to check if the user is a doctor
    useEffect(() => {
      isDoctor(username)
    }, [])

    if(isLoading) {
      return (
        <PageLoading />
      )
    }

    return (
          <div className="background-image">
            <div className="content">
              <b><h1 data-cy='homepage-header'>Welcome {user.username}</h1></b>
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