import axios from "axios"
import {RequestConfig} from "./requestConfig";

type doctorRegistrationInfo = {
    clinic: string,
    lastname: string,
    specialization: string,
    phoneNumber: string,
    firstname: string,
    email: string,
    staffId: string,
    username: string
}

type record = {
    doctorUsername: string,
    log: string,
    patientUsername: string,
    subject: string
}

export type DoctorInfo =  {
    clinic: string,
    _id: string,
    username: string,
    firstname: string,
    lastname: string,
    staffId: string,
    specialization: string,
    email: string,
    phoneNumber: string
}

type AllPatientInfoList = {
    "_id": string,
    "firstname": string,
    "lastname": string,
    "username": string
}[]

type getPatientResponse = {
    "pageCount": number,
    "pageNumber": number,
    "patients": AllPatientInfoList
}

export const doctorRequests = (config:RequestConfig) => {
    return {
        getDoctorInfo: async (username:string) => {
            let response: {code: string, statusCode: number, result: {} | DoctorInfo} = {code: "", statusCode: 0, result: {}}
            const params = new URLSearchParams([['username', username]])
            await axios.get(config.baseUrl + "doctor/doctorinfo", {params}).then(res => {
                response.statusCode = res.status
                response.result = res.data
            })
            .catch(err => {
                response.statusCode = err.response.status;
                response.code = err.code
            })

            return response
        },

        registerDoctor: async (body: doctorRegistrationInfo) => {
            let response: {statusCode: number, message: string} = {statusCode: 0, message: ''}
            await axios.post(config.baseUrl + 'doctor/doctorinfo', body).then((res) => {
                response.statusCode = res.status
                response.message = 'Doctor ' + body.username + ' has been registered'
            })
            
            // Uncomment when backend implements error checking
            // .catch((err) => {
            //     response.statusCode = 500
            //     response.message = 'Something has gone wrong'
            // })

            return response
        },

        postRecord: async (record:record) => {
            let response: {statusCode: number, message: string} = {statusCode: 0, message: ''}
            await axios.post(config.baseUrl + 'doctor/record-add', record).then((res) => {
                response.statusCode = res.status
                response.message = 'The record has been succesfully posted'
            }).catch((err) => {
                response.statusCode = 500
                response.message = 'Something has gone wrong'
            })
            return response
        },

        getPatients: async(page:string, searchQuery: string) =>{

            const params = new URLSearchParams({page, searchQuery});

            let response: {statusCode: number, result:getPatientResponse|null|undefined} = {statusCode:0, result:null}

            await axios.get(config.baseUrl+ "doctor/getpatients", { params: params }).then(res=>{
                response.statusCode = res.status;
                response.result = res.data
            }).catch((err) =>{
                response.statusCode = 500
                response.result = undefined
            })

            return response;
        }
    }
}
