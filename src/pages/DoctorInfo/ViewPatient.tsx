import React, { useState, useEffect, useRef } from "react";
import Subtitle from "../../components/shared/subtitle";
import PaginationNavigator from "../../components/PatientInfo/PaginationNavigator";
import {
    PatientHistoryTable,
    PatientRecords,
} from "../../components/PatientInfo/PatientHistoryTable";
import InfoPanel from "../../components/shared/user_info";
import {
    PatientInfo,
    PatientInfoResult,
    patientRequests,
} from "../../utils/requests/patient";
import {
    useNavigate,
    useOutletContext,
    useSearchParams,
} from "react-router-dom";
import { requestConfig } from "../../utils/requests/requestConfig";
import { toast } from "react-hot-toast";
import { BiRefresh } from "react-icons/bi";
import PageLoading from "../../components/shared/PageLoading";

function Profile() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [user, setUser] = useState({username: ""})
    const [isLoadingPH, setIsLoadingPH] = useState<boolean>(true);
    const [patientInfoAndRecords, setPatientInfoAndRecords] =
        useState<PatientInfoResult | null>(null);
    const [lastPage, setLastPage] = useState(1);
    const lastEvaluatedKeyRef = useRef<string>("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isNavigating, setIsNavigating] = useState(false);
    const [paginationKeys, setPaginationKeys] = useState<string[]>([]);

    const loadInfoInit = async (username: string) => {
        setIsLoadingPH(true);

        const result = await patientRequests(requestConfig).getPatientInfo(
            username,
            currentPage.toString(),
        );
        setPatientInfoAndRecords(result.result);
        if (result.result != null && !result.result.error) {
            setLastPage(result.result.records.pageCount);
            setCurrentPage(result.result.records.pageNumber);
        } else {
            // // https://emojipedia.org/symbols/
            // toast("Please add your information", {
            //     id: "Hello",
            //     duration: 10000,
            //     icon: "📣",
            //     style: {
            //         width: "1200em",
            //         height: "3em",
            //         fontSize: "1.2em",
            //     },
            // });
            // navigate("/patientinfo/update");
        }

        setIsLoadingPH(false);
        setIsNavigating(false);
    };

    const nextPage = () => {
        if (currentPage !== lastPage && isNavigating === false) {
            setIsNavigating(true);
            setCurrentPage((prev) => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1 && isNavigating === false) {
            setIsNavigating(true);
            setCurrentPage((prev) => prev - 1);
        }
    };

    const refreshPage = () => {
        if (isNavigating === false) {
            setIsNavigating(true);
            setPaginationKeys([]);
            if (currentPage != 1) {
                setCurrentPage(1);
            } else {
                triggerReload()
            }
        }
    };

    const triggerReload = () => {
        const username = searchParams.get("patientUsername")
        if(username) {
            loadInfoInit(username as string);
        } else {
            navigate(-1)
        }
    }

    useEffect(() => {
        triggerReload()
    }, [currentPage]);

    if (isLoadingPH && patientInfoAndRecords == null) {
        return <PageLoading />;
    }

    const mapPatientInfo = (patientInfo: PatientInfo) => {
        return [
            { label: "First Name:", value: patientInfo.firstname },
            { label: "Last Name:", value: patientInfo.lastname },
            { label: "Date of Birth:", value: new Intl.DateTimeFormat("en-US", {dateStyle: "full" }).format(new Date(patientInfo.dateOfBirth)) },
            { label: "Email:", value: patientInfo.email },
            { label: "Address:", value: patientInfo.address },
            { label: "Phone Number:", value: patientInfo.phoneNumber },
            { label: "Postal Code:", value: patientInfo.postalCode },
            { label: "Health Card No:", value: patientInfo.healthCardNo },
        ];
    };

    console.log(patientInfoAndRecords)

    return (
        <>
        <div className="md:px-20 px-10 py-10">
            <button className="bg-priCol hover:bg-priHover text-white font-bold py-3 px-8 rounded-md my-6 block" onClick={() => navigate(-1)}>Return to Patient List</button>
            <Subtitle title="Patient Info:" />
            <InfoPanel
                doctorInfo={
                    (patientInfoAndRecords &&
                        mapPatientInfo(patientInfoAndRecords.patientInfo)) ||
                    []
                }
            />
            <div className="flex w-full justify-between items-center mb-5">
                {/* Health record title */}
                <Subtitle title="Patient Records:" />
                <div className="space-x-6 flex">
                    {/* Refresh */}
                    <BiRefresh
                        data-cy={"refesh-table-button"}
                        className="text-4xl text-priCol cursor-pointer"
                        onClick={refreshPage}
                    />

                    {/* Paginator */}
                    <PaginationNavigator
                        currentIndex={
                            patientInfoAndRecords &&
                            patientInfoAndRecords.records &&
                            patientInfoAndRecords.records.records.length > 0
                                ? currentPage
                                : 0
                        }
                        lastPage={lastPage}
                        onLeftClick={prevPage}
                        onRightClick={nextPage}
                    />
                </div>
            </div>
            <PatientHistoryTable
                isLoadingHistory={isLoadingPH}
                history={
                    (patientInfoAndRecords &&
                        patientInfoAndRecords.records &&
                        patientInfoAndRecords?.records.records.map((record) => {
                            return {
                                dateTime: new Intl.DateTimeFormat("en-US", {dateStyle: "short", timeStyle:"short" }).format(new Date(record.date)),
                                clinic: record.clinic,
                                subject: record.subject,
                                doctor: record.doctorName,
                                id: record._id,
                            };
                        })) ||
                    []
                }
                onClickRow={(id:string) => navigate('/doctorinfo/viewrecord?recordid='+id)}
                errorLoadingHistory={false}
            />
        </div>
        </>

    );
}

export default Profile;
