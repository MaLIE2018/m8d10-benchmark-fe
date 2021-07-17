import axios from "axios";

const axiosClient = axios.create();
axiosClient.defaults.baseURL = process.env.REACT_APP_BE_URL;
axiosClient.defaults.headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};
axiosClient.defaults.timeout = 2000;
axiosClient.defaults.withCredentials = true;

export const getRequest = (URL: string, options: {} = {}) =>
  axiosClient.get(`/${URL}`, options).then((response) => response);

export const postRequest = (URL: string, payload: {}) =>
  axiosClient.post(`/${URL}`, payload).then((response) => response);

export const putRequest = (URL: string, payload: {}) =>
  axiosClient.put(`/${URL}`, payload).then((response) => response);

export const deleteRequest = (URL: string) =>
  axiosClient.delete(`/${URL}`).then((response) => response);
