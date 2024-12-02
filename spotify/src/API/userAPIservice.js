const axios = require('axios');


const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

const signUser = (data) => {
    return apiClient.post('/IAM/Auth/sign', data);
};

const verifyPhone = (data) => {
    return apiClient.post('/IAM/Auth/verify-phone', data);
};

const setPassword = (data) => {
    return apiClient.post('/IAM/Auth/set-password', data);
};

const loginUser = (data) => {
    return apiClient.post('/IAM/Auth/login', data);
};

const validateUser = () => {
    return apiClient.get('/IAM/Auth/validate');
};

module.exports = {
    signUser,
    verifyPhone,
    setPassword,
    loginUser,
    validateUser
};