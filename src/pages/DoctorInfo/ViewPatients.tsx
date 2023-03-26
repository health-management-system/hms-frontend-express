import React, {useEffect} from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import PatientTable from "../../components/viewpatients/PatientTable";
import Subtitle from "../../components/shared/subtitle";
import { PatientList } from '../../components/viewpatients/PatientTable';
import { useState } from 'react';
import PageLoading from "../../components/shared/PageLoading";
import { doctorRequests } from '../../utils/requests/doctor';
import { requestConfig } from '../../utils/requests/requestConfig';
import PaginationNavigator from "../../components/PatientInfo/PaginationNavigator";
import { BiRefresh } from "react-icons/bi";

// const patientList = [
//     {
//         patientName: "Michael Smith",
//         patientUsername: "MicheSmi",
//         id: "helo",
//     },
//     {
//         patientName: "Emma Smith",
//         patientUsername: "dakotawong",
//         id: "helo1",
//     },
//     {
//         patientName: "Rico Santana",
//         patientUsername: "santana3",
//         id: "helo2",
//     },
//     {
//         patientName: "Blake Richard",
//         patientUsername: "bean32",
//         id: "helo3",
//     },
// ];

function ViewPatients() {
    const user = useOutletContext();
    const navigate = useNavigate();
    const [patientList, setPatientList] = useState<PatientList | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isNavigating, setIsNavigating] = useState(false);
    const [lastPage, setLastPage] = useState(1);

    const gotoPatientInfo = (patientUsername: string) => {
        navigate("/doctorinfo/viewpatient?patientUsername=" + patientUsername);
    };

    const loadPatients = async(currentPage:number)=>{
        const res = await doctorRequests(requestConfig).getPatients(currentPage.toString());
        console.log(res)
        if (res.result){
            setPatientList(res.result.patients.map(patient=>({id: patient.username, patientUsername: patient.username, patientName: `${patient.firstname} ${patient.lastname}`})))
            setLastPage(res.result.pageCount)
            setCurrentPage(res.result.pageNumber);
        }else{
            setPatientList([])
        }
    }

    const nextPage = async () => {
        if (currentPage !== lastPage && isNavigating === false) {
            setIsNavigating(true);
            setCurrentPage((prev) => prev + 1);
            await loadPatients(currentPage + 1)
            setIsNavigating(false);
        }
    };

    const prevPage =async () => {
        if (currentPage > 1 && isNavigating === false) {
            setIsNavigating(true);
            setCurrentPage((prev) => prev - 1);
            await loadPatients(currentPage -1 )
            setIsNavigating(false)
        }
    };

    const refreshPage = () => {
        if (isNavigating === false) {
            setIsNavigating(true); 
            loadPatients(currentPage);
            setIsNavigating(false)
        }
    };

    useEffect(()=>{
        loadPatients(1)
    },[])

    if(!patientList){
        return <PageLoading/>
    }

    return (
        <div className="md:px-20 px-10 py-10">
            <div className="flex w-full justify-between items-center mb-5">
                <Subtitle title="Patient List:" />
                <div className="space-x-6 flex">
                    {/* Refresh */}
                    <BiRefresh
                        data-cy={"refesh-table-button"}
                        className="text-4xl text-priCol cursor-pointer"
                        onClick={refreshPage}
                    />
                    {/* Paginator */}
                    <PaginationNavigator
                        currentIndex={currentPage}
                        lastPage={lastPage}
                        onLeftClick={prevPage}
                        onRightClick={nextPage}
                    />
                </div>
            </div>
                <PatientTable
                patientList={patientList}
                onClickRow={gotoPatientInfo}
            />
        </div>
    );
}

export default ViewPatients;