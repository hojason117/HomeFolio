import Axios from 'axios';
import { servAddr, urlPrefix } from '../Main';

class DataService {
    constructor() {
        this.baseUrl = servAddr + urlPrefix;
    }
  
    
}

export default DataService;