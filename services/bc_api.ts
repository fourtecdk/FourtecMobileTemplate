import axios from 'axios';

const {
  EXPO_PUBLIC_BC_TENANT_ID: TENANT_ID,
  EXPO_PUBLIC_BC_CLIENT_ID: CLIENT_ID,
  EXPO_PUBLIC_BC_CLIENT_SECRET: CLIENT_SECRET,
  EXPO_PUBLIC_BC_ENVIRONMENT: ENVIRONMENT,
  EXPO_PUBLIC_BC_COMPANY_ID: COMPANY_ID,
  EXPO_PUBLIC_BC_BASE_URL: BASE_URL_ROOT
} = process.env;

const AUTH_URL = `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`;
const BASE_URL = `${BASE_URL_ROOT}/${ENVIRONMENT}/api/v2.0/companies(${COMPANY_ID})`;

const BC_API = axios.create({ baseURL: BASE_URL });

BC_API.interceptors.request.use(async (config) => {
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID || '');
  params.append('client_secret', CLIENT_SECRET || '');
  params.append('scope', 'https://api.businesscentral.dynamics.com/.default');
  params.append('grant_type', 'client_credentials');

  const res = await axios.post(AUTH_URL, params);
  config.headers.Authorization = `Bearer ${res.data.access_token}`;
  return config;
});

export default BC_API;