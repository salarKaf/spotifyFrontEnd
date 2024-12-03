const apiClient = {
    baseURL: "https://spotifyapi.phaedra.ir",
    headers: {
        'Content-Type': 'application/json'
    }
};

const loginUser = async (username, password) => {
    try {
        const response = await fetch(apiClient.baseURL + '/IAM/Auth/login', {
            method: 'POST',
            headers: apiClient.headers,
            body: JSON.stringify({
                username,
                password
            })
        });

        if (response.status !== 200) {
            return {
                success: false,
                message: 'Login failed',
                token: null
            };
        }

        let data = await response.json();
        return {
            success: true,
            message: 'Login successful',
            token: data.token
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
        if (response.status !== 200)
            return {
                success: false,
                message: 'Phone verification failed',
                token: null
            };

        let data = await response.json();

        return {
            success: true,
            message: 'Phone verification successful',
            token: data.token
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

        if (response.status !== 200)
            return {
                success: false,
                message: 'Failed to set password',
            }

        return {
            success: true,
            message: 'Password set successfully',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Failed to set password',
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

        if (response.status !== 200)
            return {
                success: false,
                message: 'User sign up failed',
            };
        return {
            success: true,
            message: 'User sign up successful',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'User sign up failed',
        };
    }
};

const validateUser = async (token) => {
    try {
        const response = await fetch(apiClient.baseURL + '/IAM/Auth/validate', {
            method: 'GET',
            headers: {
                ...apiClient.headers,
                Authorization: `Bearer ${token}`
            }
        });

        if (response.status !== 200)
            return {
                success: false,
                message: 'User validation failed',
                data: null
            };
        
        let data = await response.json();
        return {
            success: true,
            message: 'User validation successful',
            data: data.user
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