import { useState,useEffect } from "react"
import Subtitle from "../../components/shared/subtitle"
import PageLoading from "../../components/shared/PageLoading";
import { useNavigate, useSearchParams } from "react-router-dom";
import DoctorInfo from "../../components/shared/user_info";
import { doctorRequests } from "../../utils/requests/doctor";
import { requestConfig } from "../../utils/requests/requestConfig"



function DoctorProfile(){
    let navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const [isLoading, setLoading]=useState(null)
    const [doctorinfo, setdoctorinfo]=useState(null)

    const getDoctorUser = async()=>{
        setLoading(true)
        const username=searchParams.get("username")
        console.log(username)
        const result=await doctorRequests(requestConfig).getDoctorInfo(username)
        console.log(result)

        if (result.statusCode===200){
            setdoctorinfo(result.result)
        }
        setLoading(false)
    }

    const goback=()=>{
        navigate(-1)
    }

    useEffect(()=>{
        getDoctorUser()
    },[])

    if (isLoading|| doctorinfo == null || doctorinfo == undefined){
        return(
            <PageLoading/>
        )
    }
    const doctorMap = (doctorInformation) => {
        return [
            { label: "First Name:", value: doctorInformation.firstname },
            { label: "Last Name:", value: doctorInformation.lastname },
            { label: "Staff ID:", value: doctorInformation.staffID },
            { label: "Clinic:", value: doctorInformation.clinic },
            {label: "Specialization:",value: doctorInformation.specialization,},
            { label: "Email:", value: doctorInformation.email },
            { label: "Phone Number:", value: doctorInformation.phonenumber },
        ];
    };

    
    return(
        <div className="md:px-20 px-10 py-10">
        <Subtitle title="Doctor Info:" />
        <DoctorInfo doctorInfo={doctorMap(doctorinfo)} />
        <button className="bg-priCol hover:bg-priHover text-white font-bold py-3 px-8 rounded-md my-6" onClick={goback}>Back</button>
        </div>
    )
}

export default DoctorProfile