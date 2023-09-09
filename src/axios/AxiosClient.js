import axios from 'axios';
import { getCookie } from '../utils/cookies';

const PROD_URL = 'https://api.travena.io/';
const DEV_URL = 'https://devapi.travena.io/';

const BASE_URL = DEV_URL;

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

const customErrorConfig = (error) => Promise.reject(error);
// Do something with request error

axiosClient.interceptors.request.use(async (config) => {
  const userData = getCookie('UserInfo');

  const authToken = userData ? userData.accessToken : '';

  config.headers = {
    authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
    XClient: 'AGENCY-PORTAL',
  };

  return config;
}, customErrorConfig);

axiosClient.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      window.location = `${window.location.origin}/login`;
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
