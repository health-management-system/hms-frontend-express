import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export type PatientList = {
    patientName: string
    patientUsername: string
    id: string;
}[]
function PatientTable(props: {patientList:PatientList, isLoading?:boolean, onClickRow?:(...event:any[])=>void}) {
  return (
      <div className="bg-secCol w-full  rounded-xl overflow-x-scroll md:overflow-hidden ">
        <div className="w-[800px] md:w-full">
                <div
                    data-cy="PatientHistoryTable-table-headers"
                    className="py-5 grid grid-cols-2 bg-priCol font-medium text-white gap-x-3 text-center border-b-[1px] border-black  "
                >
                      <h1>Name</h1>
                      <h1>Username</h1>
                </div>
                {
                    props.isLoading ? (
                           <div
                        data-cy="PatientHistoryTable-loading-container"
                        className="w-full h-[30vh] flex justify-center items-center space-x-4"
                    >
                        <h1 data-cy="PatientHistoryTable-loading-text">
                            Loading your records
                        </h1>
                        <AiOutlineLoading3Quarters
                            data-cy="PatientHistoryTable-loading-spinner"
                            className="animate-spin text-xl text-priCol"
                        />{" "}
                    </div>
                    ):  props.patientList && props.patientList.length > 0 ? (
                    props.patientList?.map((patient, index) => (
                        <div
                            data-cy={"PatientHistoryTable-record-field"}
                            id={`id${patient.id}`}
                            className={`px-5 text-center py-5 grid grid-cols-2 gap-x-3 cursor-pointer hover:bg-white group ${
                                props.patientList!== undefined &&
                                index !== props.patientList.length - 1
                                    ? "border-b-[1px] border-black"
                                    : ""
                            }`}
                            key={patient.id}
                            onClick={() => props.onClickRow && props.onClickRow(patient.patientUsername)}
                        >
                            <h1 className="group-hover:underline">
                                {patient.patientName}
                            </h1>
                            <h1 className="group-hover:underline">
                                {patient.patientUsername}
                            </h1>

                        </div>
                    ))
                ) : (
                    <div
                        data-cy="PatientHistoryTable-loading-container"
                        className="w-full h-[30vh] flex justify-center items-center space-x-4"
                    >
                        <h1 data-cy="PatientHistoryTable-loading-text">
                            No Patients available
                        </h1>
                    </div>
                )
                }
        </div>
      </div>
  )
}

export default PatientTable