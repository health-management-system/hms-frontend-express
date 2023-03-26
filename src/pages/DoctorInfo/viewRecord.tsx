import Subtitle from '../../components/shared/subtitle';
import PatientRecord from '../../components/shared/patient_record';
import { generalRequests, RecordType, EmptyRecord } from '../../utils/requests/general';
import { requestConfig } from '../../utils/requests/requestConfig';
import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLoading from "../../components/shared/PageLoading";

function ViewRecord() {

    const [Record, setRecord] = useState<RecordType>(EmptyRecord)
    const [foundRecord, setFoundRecord] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [hasRecordID, setHasRecordID] = useState(false);
    const [DoctorUsername, setDoctorUsername]=useState("")
    const [searchParams] = useSearchParams();
    let navigate = useNavigate()

    const patientInfo = () => {
        navigate(-1)
    }

    const getRecord = async() => {
        //setLoading(true)
        const id = searchParams.get("recordid")
        console.log(id)
        if (id != null) {
            setHasRecordID(true)
            const result = await generalRequests(requestConfig).getRecord(id)
            console.log(result)
            if(result.statusCode === 200 && Object.keys(result.result).length > 1){
                setRecord(result.result)
                setDoctorUsername(result.result.doctorUsername)
                setFoundRecord(true)
            }
        }
        setLoading(false)
    }

    const doctorProfile=()=>{
        let path="/doctorinfo/viewdoctor?username="+DoctorUsername
        navigate(path)
    }

    useEffect(() => {
        getRecord()
      }, [])

    if(isLoading) {
        return (
            <PageLoading />
        )
    }

    if(!isLoading && (!foundRecord || !hasRecordID)) {
        return (
            <div className='error-without-background md:px-20 px-10 py-10'>
                <div className='error-page'>
                    <h1 className='page-not-found-header'>Record Not Found</h1>
                    <div className="error-div rounded-md">
                        The record you are looking for could not be found. Please go back and try to view another record.
                    </div>
                    <button className="error-page-button hover:bg-priHover rounded-md" onClick={patientInfo}>Go Back</button>
                </div>
            </div>
        )
    }
    
    return (
        <div className="md:px-20 px-10 py-10">
            <Subtitle title='Record:' />
            <PatientRecord onClickDoctor={doctorProfile} record={Record} isDoctorNameHoverable />
            <button className="bg-priCol hover:bg-priHover text-white font-bold py-3 px-8 rounded-md my-6" onClick={patientInfo}>Back</button>
        </div>
    )

}

export default ViewRecord;