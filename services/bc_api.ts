import axios from 'axios';

// Configured for Per-Customer BC Environment
const BC_API = axios.create({
  baseURL: 'https://api.businesscentral.dynamics.com/v2.0/' + process.env.EXPO_PUBLIC_BC_TENANT_ID + '/' + process.env.EXPO_PUBLIC_BC_ENVIRONMENT + '/ODataV4/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default BC_API;
