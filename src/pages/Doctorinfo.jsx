import ProfileLayout from "../components/layouts/ProfileLayout";
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router";
import { generalRequests } from '../utils/requests/general'
import { requestConfig } from "../utils/requests/requestConfig";
import PageLoading from '../components/shared/PageLoading';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie'

function DoctorInfo() {

    function signOut () {
        Cookies.remove('username')
        Cookies.remove('role')
        navigate('/')
    }

    // Declarations
    const [username, setUsername] = useState(Cookies.get('username'))
    const [role, setRole] = useState(Cookies.get('role'))
    const [isLoading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // Method to check if the user is a Doctor
    const checkRole = () => {
        // Set Loading State True
        setLoading(true)
        console.log('Role: ' + role)
        // If not a doctor (patient user) then nagivate user to /patientinfo
        if(role == 'PATIENT') {
            // Console log invalid permissions
            console.log('Error: Access Denied')
            // Invalid role: navigate to patient profile
            navigate('/patientinfo')
        } else if (role != 'DOCTOR') {
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
        <div>
            <ProfileLayout signOut={signOut}>
                <Outlet context={{username: username}}/>
            </ProfileLayout>
            <Toaster />
        </div>
    );
}

export default  DoctorInfo