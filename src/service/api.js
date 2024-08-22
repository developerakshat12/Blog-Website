import axios from 'axios';
import { API_NOTIFICAITION_MESSAGES, SERVICE_URLS} from '../constants/config';

const API_URL = "http://localhost:8000/";

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000, 
    headers: {
        "content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    function(config) {
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    function(response) {
        // Stop global loader here
        return processResponse(response);
    },
    function(error) {
        // Stop global loader here
        return Promise.reject(processError(error));
    }
)

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isFailure: true, status: string, msg: string, code: int }
//////////////////////////////
const processResponse = (response) => {
    if (response?.status === 200) {
        return { isSuccess: true, data: response.data }
    } else {
        return {
            isFailure: true,
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
    }
}

///////////////////////////////
// If success -> returns { isSuccess: true, data: object }
// If fail -> returns { isError: true, status: string, msg: string, code: int }
//////////////////////////////
const processError = async (error) => {
    if (error.response) {
        // Request made and server responded with a status code 
        // that falls out of the range of 2xx
        console.log("ERROR IN RESPONSE: ", error.toJSON());
            return {
                isError: true,
                msg: API_NOTIFICAITION_MESSAGES.responseFailure,
                code: error.response.status
            }
        } else if (error.request) { 
        // The request was made but no response was received
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICAITION_MESSAGES.requestFailure,
            code: ""
        }
    } else { 
        // Something happened in setting up the request that triggered an Error
        console.log("ERROR IN RESPONSE: ", error.toJSON());
        return {
            isError: true,
            msg: API_NOTIFICAITION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => {
        // Debugging: Log the API endpoint and request payload
        console.log(`API Request - Endpoint: ${value.url}`);
        console.log('Request Payload:', body);

        return axiosInstance({
            method: value.method,
            url: value.url,
            data: body,
            responseType: value.responseType,
            headers : {
                "Accept": "application/json, multipart/form-data", 
                "Content-Type": "application/json"
            },
            onUploadProgress: function (progressEvent) {
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function (progressEvent) {
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        });
    };
}

export { API };