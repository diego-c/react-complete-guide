import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://react-burger-3e6f5.firebaseio.com/'
});

export default axiosInstance;