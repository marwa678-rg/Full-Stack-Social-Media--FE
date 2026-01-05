//Imports
import axios from "axios";
import{baseUrlHandler}from"../utilis/baseUrlHandler";
export const api = axios.create({
  //Base Backend
  baseURL:baseUrlHandler(),

});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});