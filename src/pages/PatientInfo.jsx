import { useEffect, useState } from "react";
import ProfileLayout from "../components/layouts/ProfileLayout";
import { Outlet, useNavigate, useLocation } from "react-router";
import { generalRequests } from '../utils/requests/general'
import { requestConfig } from "../utils/requests/requestConfig";
import PageLoading from '../components/shared/PageLoading';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'

function PatientInfo() {

    function signOut () {
        Cookies.remove('username')
        Cookies.remove('role')
        navigate('/')
    }

    // Declarations
    const [username, setUsername] = useState(Cookies.get('username'))
    const [role, setRole] = useState(Cookies.get('role'))
    const [isLoading, setLoading] = useState(false)
    const [currentPath, setPath] = useState('/patientinfo')
    const location = useLocation()
    const navigate = useNavigate()

    // Method to check if the user is a Patient
    const checkRole = () => {
        // Set Loading State True
        setLoading(true)
        console.log('Role: ' + role)
        // If not a patient (doctor user) then nagivate user to /doctorinfo
        if(role == 'DOCTOR') {
            // Console log invalid permissions
            console.log('Error: Access Denied')
            // Invalid role: navigate to doctor profile
            navigate('/doctorinfo')
        } else if (role != 'PATIENT') {
            navigate('/patient-login')
        }
        // Set Loading State False
        setLoading(false)
    }

    // Use effect to check user role on every location change
    useEffect(() => {
        checkRole()
    }, [location])

    // Loading Page while checking user role (required to hide unwanted toast messages)
    if(isLoading) { return (<PageLoading />)}

    return (
        <div className="w-full min-h-screen">
            <ProfileLayout signOut={signOut}>
                <Outlet context={{username: username}}/>
            </ProfileLayout>
            <Toaster />
        </div>
    );
}



export default  PatientInfo