import axios from "axios";
import { RequestConfig } from "./requestConfig";

export const patientRequests = (config: RequestConfig) => {
    return {
        registerPatient: async (body: patientRegistrationInfo) => {
            let response: { statusCode: number; message: string } = {
                statusCode: 0,
                message: "",
            };
            await axios
                .post(config.baseUrl + "patient/register", body)
                .then((res) => {
                    response.statusCode = res.status;
                    response.message =
                        "Patient " + body.username + " has been registered";
                })
                // .catch((err) => {
                //     response.statusCode = err.response.status;
                //     response.message = "Something has gone wrong";
                // });
            return response;
        },
        getPatientInfo: async (
            username: string,
            page: string
        ) => {
            const params1 = new URLSearchParams({
                username
            });
            const params2 = new URLSearchParams({
                username,
                page
            });

            let response: {
                code: string;
                statusCode: number;
                result: PatientInfoResult | null;
            } = {
                code: "",
                statusCode: 0,
                result: null,
            };

            const info = await axios.get(config.baseUrl + "patient/patientinfo", { params: params1 })
            const records = await axios.get(config.baseUrl + "patient/records", { params: params2 })
            
            response.result = {
                patientInfo: info.data,
                records: records.data,
                error: ""
            }
            
            return response;
        },
        getRecords: async (username:string, page:string) => {
            const params = new URLSearchParams({
                username,
                page
            });

            let response: {
                code: string;
                statusCode: number;
                result: RecordTableInfo | null;
            } = {
                code: "",
                statusCode: 0,
                result: null
            }

            await axios
                .get(config.baseUrl + "patient/records", { params: params })
                .then((res) => {
                    response.statusCode = res.status;
                    response.result = res.data;
            })
            return response;
        }
    };
};

// types for register patient
type patientRegistrationInfo = {
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    dateOfBirth: string;
    healthCardNo: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
};

// types for getPatientInfo
type RecordRow = {
    _id: string;
    doctorName: string;
    doctorUsername: string;
    patientUsername: string;
    clinic: string;
    subject: string;
    date: string;
};

export type PatientInfo = {
    _id: string,
    username: string;
    firstname: string;
    lastname: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    address: string;
    postalCode: string;
    healthCardNo: string;
};

export type RecordTableInfo = {
    pageCount: number;
    pageNumber: number;
    records: RecordRow[];
};

export type PatientInfoResult = {
    patientInfo: PatientInfo;
    records: RecordTableInfo;
    error: string;
};
