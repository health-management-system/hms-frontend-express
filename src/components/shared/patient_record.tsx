import React, { useState } from "react";
import "./patient_record.css";
import { RecordType } from "../../utils/requests/general";

function patientRecord(props: { record: RecordType, onClickDoctor?: (...event:any[])=>void , isDoctorNameHoverable?:boolean }) {
    return (
        <div className="outer-box rounded-md">
            <div className="inner-box rounded-md">
                <ul className="view-record-panel rounded-md">
                    <li className={`view-record-list-item rounded-md  ${props.isDoctorNameHoverable? "cursor-pointer hover:underline":""}`}>
                        <label className="view-record-label">
                            Doctor Name:{" "}
                        </label>{" "}
                        <span  onClick={props.onClickDoctor} className={`view-record-span `}>
                            {props.record.doctorName}
                        </span>
                    </li>
                    <li className="view-record-list-item rounded-md">
                        <label className="view-record-label">Clinic: </label>{" "}
                        <span className="view-record-span">
                            {props.record.clinic}
                        </span>
                    </li>
                    <li className="view-record-list-item rounded-md">
                        <label className="view-record-label">Subject: </label>{" "}
                        <span className="view-record-span">
                            {props.record.subject}
                        </span>
                    </li>
                    <li className="view-record-list-item rounded-md">
                        <label className="view-record-label">Date: </label>{" "}
                        <span className="view-record-span">
                            {props.record.dateTime}
                        </span>
                    </li>
                    <li className="view-record-log-li rounded-md">
                        <div className="view-record-log-label">Log:</div>
                        <article className="record-log-article rounded-md">
                            {props.record.log}
                        </article>
                    </li>
                </ul>
                <div className="view-record-panel rounded-md"></div>
            </div>
        </div>
    );
}

export default patientRecord;
