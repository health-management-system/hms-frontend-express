import { createBrowserRouter } from "react-router-dom";
import Homepage from './homepage'
import ErrorPage from "./ErrorPage";
import PatientInfo from "./PatientInfo";
import Doctorinfo from "./Doctorinfo";
import PatientProfile from "./PatientInfo/Profile";
import PatientRegistration from "./PatientInfo/Registration";
import DoctorProfile from "./DoctorInfo/Profile";
import DoctorRegistration from "./DoctorInfo/Registration"
import ViewRecord from './PatientInfo/viewRecord.tsx';
import ViewDoctor from './PatientInfo/ViewDoctor';
import PatientLogin from "./Auth/PatientLogin";
import PatientSignup from "./Auth/PatientSignup";
import DoctorLogin from "./Auth/DoctorLogin";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Homepage />,
        errorElement: <ErrorPage/>,
       
    },
    {
        path: "/doctor-login",
        element: <DoctorLogin />
    },
    {
        path: "/patient-login",
        element: <PatientLogin />
    },
    {
        path: "/patient-signup",
        element: <PatientSignup />
    },
    {
        path: "/patientinfo/",
        element: <PatientInfo />,
        children: [{
            path: "",
            element: <PatientProfile/>,
        }, {
            path: "update/",
            element: <PatientRegistration />
        }, {
            path: "viewrecord/",
            element: <ViewRecord />
        },{
            path: "viewdoctor/",
            element:<ViewDoctor/>
        }]
    },
    {
        path: "/doctorinfo",
        element: <Doctorinfo />,
        children: [{
            path: "",
            element: <DoctorProfile/>,
        }, {
            path: "update/",
            element: <DoctorRegistration />
        }]
    }
    
    
]);

export default router;
