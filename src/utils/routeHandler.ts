import { baseURL } from "../constants";
import { useNavigate } from 'react-router-dom'

import axios from "../utils/axios";
export const routeHandler = async (router: any) => {

  const navigate = useNavigate()

  try {
    const user = await axios.get(`${baseURL}/user`, { withCredentials: true, });
    if (user.status >= 400) {
      navigate("/auth/login");
      return false;
    }
    const data = user.data;
    if (!data.verified) {
      if (router.pathname !== "/auth/verify") {
        navigate("/auth/verify");
        return false;
      }
      return user;
    } else if (!data.category) {
      if (router.pathname !== "/auth/category") {
        navigate("/auth/category");
        return false;
      }
      return user;
    } else {
      if (router.pathname !== "/") {
        navigate("/dashboard");
        return false;
      }
      return user;
    }
  } catch (error: any) {
    if (error.response.status === 401) {
      navigate("/auth/login");
      return false;
    }
  }
};
