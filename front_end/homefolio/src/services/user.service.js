import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';

class UserService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }

    fetchUserInfo = async (u_id) => {
        var info;
        try {
            const response = await Axios.get('/userInfo/' + u_id,
                {
                    baseURL: this.baseUrl,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('auth_token') }
                })
            if (response.status === 200) {
                info = response.data;
            }
            else
                console.log('Unexpected response code: ' + response.status);
        }
        catch(error) {
            if (error.response) {
                if (error.response.status === 404) {
                    console.log('User not found.');
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

        return info;
    }
}

export default UserService;