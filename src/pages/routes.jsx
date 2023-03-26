import { createBrowserRouter } from "react-router-dom";
import Homepage from './homepage'
import ErrorPage from "./ErrorPage";
import PatientInfo from "./PatientInfo";
import Doctorinfo from "./Doctorinfo";
import PatientProfile from "./PatientInfo/Profile";
import PatientRegistration from "./PatientInfo/Registration";
import DoctorProfile from "./DoctorInfo/Profile";
import DoctorRegistration from "./DoctorInfo/Registration"
import ViewRecordPatient from './PatientInfo/viewRecord.tsx';
import ViewDoctorPatient from './PatientInfo/ViewDoctor';
import PatientLogin from "./Auth/PatientLogin";
import PatientSignup from "./Auth/PatientSignup";
import DoctorLogin from "./Auth/DoctorLogin";
import ViewPatients from "./DoctorInfo/ViewPatients";
import ViewPatient from "./DoctorInfo/ViewPatient";
import ViewRecordDoctor from "./DoctorInfo/viewRecord"
import ViewDoctorDoctor from "./DoctorInfo/ViewDoctor"

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
            element: <ViewRecordPatient />
        },{
            path: "viewdoctor/",
            element:<ViewDoctorPatient/>
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
        },{
            path: "viewpatients/",
            element: <ViewPatients />,
        },{
            path: "viewpatient/",
            element: <ViewPatient />
        },{
            path: "viewrecord/",
            element: <ViewRecordDoctor />
        },{
            path: "viewdoctor/",
            element: <ViewDoctorDoctor />
        }]
    }
    
    
]);

export default router;
