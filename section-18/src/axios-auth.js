import axios from 'axios';

export default axios.create({
    baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
});