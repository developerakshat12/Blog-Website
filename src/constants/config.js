// API_NOTIFICAITION _MESSAGES

export const API_NOTIFICAITION_MESSAGES = {
    loading:{
        title : 'Loading',
        message : 'Data is being loaded,please wait'
    },
    success:{
        title: 'Success',
        message : 'Data successfully loaded'
    },
    responseFailure:{
        title:'Error',
        message: 'An error occured while fetching response from the server .Pleease try again '
    },
    requestFailure:{
        title:'Error',
        message:'An error occured while passing request data'
    },
    networkError:{
        title:'Error',
        message:'Unable to connect to server check your network connection'
    }
} 

//API SERVICE CALL
//SAMPLE  REQUEST
//NEED SERVICE CALL  : {url : '/' , method : 'POST/GET/DELETE params : true/false,query : true/false }
export const SERVICE_URLS = {
    userLogin: { url: '/login', method: 'POST' },
    userSignup : { url : '/signup',method : 'POST'},
    uploadFile: { url: '/file/upload', method: 'POST' },

    createPost : {url : '/create', method : 'POST'}
}