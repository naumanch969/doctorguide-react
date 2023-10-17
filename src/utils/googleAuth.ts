import axios from "../utils/axios";
import { baseURL } from "../constants";

export const handleGoogle = async () => {
  axios.get(`${baseURL}/auth/google`, {
    withCredentials: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
  });
};
