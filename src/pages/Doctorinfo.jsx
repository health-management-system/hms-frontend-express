import ProfileLayout from "../components/layouts/ProfileLayout";
import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from "react-router";
import { generalRequests } from '../utils/requests/general'
import { requestConfig } from "../utils/requests/requestConfig";
import PageLoading from '../components/shared/PageLoading';
import toast, { Toaster } from 'react-hot-toast';

function DoctorInfo() {

    // Declarations
    const username = user.username
    const [isLoading, setLoading] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    // Method to check if the user is a Doctor
    const checkRole = async(username) => {
        // Set Loading State True
        setLoading(true)
        // Request role of user (true -> Doctor && false -> Patient)
        const isDoctor = await generalRequests(requestConfig).isDoctor(username)
        console.log('Is Doctor: ' + isDoctor)
        // If not a doctor (patient user) then nagivate user to /patientinfo
        if(!isDoctor) {
            // Console log invalid permissions
            console.log('Error: Access Denied')
            // Invalid role: navigate to patient profile
            navigate('/patientinfo')
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
        <div>
            <ProfileLayout signOut={signOut}>
                <Outlet context={user}/>
            </ProfileLayout>
            <Toaster />
        </div>
    );
}

export default  DoctorInfo