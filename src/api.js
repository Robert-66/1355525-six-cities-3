import axios from 'axios';

const Error = {
  UNAUTHORIZED: 401,
};

export function createAPI(onUnauthorized) {
  const api = axios.create({
    baseURL: `https://htmlacademy-react-3.appspot.com/six-cities`,
    timeout: 5000,
    withCredentials: true,
  });

  function onSuccess(response) {
    return response;
  }

  function onFailure(error) {
    const {response} = error;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw error;
  }

  api.interceptors.response.use(onSuccess, onFailure);

  return api;
}
