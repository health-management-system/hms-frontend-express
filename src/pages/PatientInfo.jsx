import { useEffect, useState } from "react";
import ProfileLayout from "../components/layouts/ProfileLayout";
import { Outlet, useNavigate, useLocation } from "react-router";
import { generalRequests } from '../utils/requests/general'
import { requestConfig } from "../utils/requests/requestConfig";
import PageLoading from '../components/shared/PageLoading';
import toast, { Toaster } from 'react-hot-toast';

function PatientInfo() {
   
    // REMOVE LATER
    let user = {
        username: "placeholder",
    }
    function signOut () {return null}

    // Declarations
    const username = user.username
    const [isLoading, setLoading] = useState(false)
    const [currentPath, setPath] = useState('/patientinfo')
    const location = useLocation()
    const navigate = useNavigate()

    // Method to check if the user is a Patient
    const checkRole = async(username) => {
        // Set Loading State True
        setLoading(true)
        // Request role of user (true -> Doctor && false -> Patient)
        const isDoctor = await generalRequests(requestConfig).isDoctor(username)
        console.log('Is Doctor: ' + isDoctor)
        // If not a patient (doctor user) then nagivate user to /doctorinfo
        if(isDoctor) {
            // Console log invalid permissions
            console.log('Error: Access Denied')
            // Invalid role: navigate to doctor profile
            navigate('/doctorinfo')
        }
        // Set Loading State False
        setLoading(false)
    }

    // Use effect to check user role on every location change
    useEffect(() => {
        checkRole(username)
    }, [location])

    // Loading Page while checking user role (required to hide unwanted toast messages)
    if(isLoading) { return (<PageLoading />)}

    return (
        <div className="w-full min-h-screen">
            <ProfileLayout signOut={signOut}>
                <Outlet context={user}/>
            </ProfileLayout>
            <Toaster />
        </div>
    );
}



export default  PatientInfo