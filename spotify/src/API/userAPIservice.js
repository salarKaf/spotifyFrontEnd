const apiClient = {
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
};

const loginUser = async (username, password) => {
    try {
        const response = await fetch(apiClient.baseURL + '/IAM/Auth/sign', {
            method: 'POST',
            headers: apiClient.headers,
            body: JSON.stringify({
                username,
                password
            })
        });
        return {
            success: true,
            message: 'Login successful',
            data: response
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Login failed',
            data: null
        };
    }
};

const verifyPhone = async (phoneNumber, code) => {
    try {
        const response = await fetch(apiClient.baseURL + '/IAM/Auth/verify-phone', {
            method: 'POST',
            headers: apiClient.headers,
            body: JSON.stringify({
                phoneNumber,
                code
            })
        });
        return {
            success: true,
            message: 'Phone verification successful',
            data: response
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Phone verification failed',
            data: null
        };
    }
};

const setPassword = async (username, password, token) => {
    try {
        const response = await fetch(apiClient.baseURL + '/IAM/Auth/set-password', {
            method: 'POST',
            headers: {
                ...apiClient.headers,
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                username,
                password,
                token
            })
        });
        return {
            success: true,
            message: 'Password set successfully',
            data: response
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to set password',
            data: null
        };
    }
};

const signUser = async (phoneNumber) => {
    try {
        const response = await fetch(apiClient.baseURL + '/IAM/Auth/sign', {
            method: 'POST',
            headers: apiClient.headers,
            body: JSON.stringify({
                phoneNumber
            })
        });
        return {
            success: true,
            message: 'User sign up successful',
            data: response
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'User sign up failed',
            data: null
        };
    }
};

const validateUser = async (token) => {
    try {
        const response = await fetch(apiClient.baseURL + '/IAM/Auth/validate', {
            method: 'POST',
            headers: {
                ...apiClient.headers,
                Authorization: `Bearer ${token}`
            }
        });
        return {
            success: true,
            message: 'User validation successful',
            data: response
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'User validation failed',
            data: null
        };
    }
};

module.exports = {
    signUser,
    verifyPhone,
    setPassword,
    loginUser,
    validateUser
};