import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';
import jwt_decode from 'jwt-decode';

class AuthService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
        this.isAuthenticated = false;
    }

    authenticate = (token) => {
        var decoded = jwt_decode(token);
        return (Date.now()/1000 < decoded.exp) ? true : false;
    }

    login = (email, password) => {
        Axios.post('/login', 
            {
                email: email,
                password: password
            },
            {
                baseURL: this.baseUrl
            })
            .then(
                response => {
                    if(response.status === 200) {
                        console.log('Login successful.');
                        localStorage.setItem('u_id', response.data.u_id);
                        localStorage.setItem('username', response.data.username);
                        localStorage.setItem('auth_token', response.data.token);
                    }
                    else {
                        console.log('Unexpected response code: ' + response.status);
                    }
                })
            .catch(this.loginErrorHandler);
    }

    loginErrorHandler = (error) => {
        if(error.response) {
            if (error.response.status === 401) {
                console.log('Email or password incorrect.');
                alert('Email or password incorrect.');
            }
        }
        else if(error.request) {
            console.log('No response from server.');
            console.log(error.request);
        }
        else {
            console.log(error.message);
        }
    }

    signup = (email, username, password, age, area, bio) => {
        Axios.post('/signup',
            {
                email: email,
                username: username,
                password: password,
                age: age,
                area: area,
                bio:bio
            },
            {
                baseURL: this.baseUrl
            })
            .then(
                response => {
                    if (response.status === 201) {
                        console.log('Signup successful.');
                        localStorage.setItem('u_id', response.data.u_id);
                        localStorage.setItem('username', response.data.username);
                    }
                    else {
                        console.log('Unexpected response code: ' + response.status);
                    }
                })
            .catch(this.errorHandler);
    }

    signupErrorHandler = (error) => {
        if (error.response) {
            if (error.response.status === 400) {
                console.log('Email, username and password cannot be empty.');
                alert('Email, username and password cannot be empty.');
            }
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

export default AuthService;