import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';
import jwt_decode from 'jwt-decode';

class AuthService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }

    authenticate = (token) => {
        if(token === null)
            return false;

        var decoded = jwt_decode(token);
        return (Date.now()/1000 < decoded.exp) ? true : false;
    }

    login = async (email, password) => {
        try {
            const response = await Axios.post('/login', 
            {
                email: email,
                password: password
            },
            {
                baseURL: this.baseUrl
            });
            if (response.status === 200) {
                console.log('Login successful.');
                localStorage.setItem('u_id', response.data.u_id);
                localStorage.setItem('username', response.data.username);
                localStorage.setItem('auth_token', response.data.token);
                localStorage.setItem('authenticated', 'yes');
                localStorage.setItem('seller', (response.data.seller) ? 'yes' : 'no');
                localStorage.setItem('buyer', (response.data.buyer) ? 'yes' : 'no');
            }
            else {
                console.log('Unexpected response code: ' + response.status);
            }
        }
        catch(error) {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log('Email or password incorrect.');
                    throw new Error('Email or password incorrect.');
                }
                else
                    console.log(error.response);
            }
            else if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
        }
    }

    signup = async (email, username, password, age, area, bio, seller, buyer) => {
        try {
            const response = await Axios.post('/signup',
                {
                    email: email,
                    username: username,
                    password: password,
                    age: age,
                    area: area,
                    bio: bio,
                    seller: seller,
                    buyer: buyer
                },
                {
                    baseURL: this.baseUrl
                });
            if (response.status === 201) {
                console.log('Signup successful.');
                localStorage.setItem('u_id', response.data.u_id);
                localStorage.setItem('username', response.data.username);
            }
            else {
                console.log('Unexpected response code: ' + response.status);
            }
        }
        catch(error) {
            if (error.response) {
                if (error.response.status === 400) {
                    console.log('Email, username and password cannot be empty, or username, email already used.');
                    throw new Error('Email, username and password cannot be empty, or username, email already used.');
                }
                else
                    console.log(error.response);
            }
            else if (error.request) {
                console.log('No response from server.');
                console.log(error.request);
            }
            else {
                console.log(error.message);
            }
        }
    }
}

export default AuthService;