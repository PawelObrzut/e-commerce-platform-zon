import axios from "axios";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosIntercept = (url: string) => {
  const refresh = useRefreshToken();
  const { user } = useAuth();
  const axiosIntercept: any = axios.create({
    baseURL: url,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });

  useEffect(() => {
    const interceptReq = axiosIntercept.interceptors.request.use(
      (config: any) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${user?.accessToken}`;
        }
        return config;
      }, (error: any) => Promise.reject(error)
    );

    const interceptRes = axiosIntercept.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosIntercept(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosIntercept.interceptors.request.eject(interceptReq);
      axiosIntercept.interceptors.response.eject(interceptRes);
    }
  }, [user, refresh])

  return axiosIntercept;
}

export default useAxiosIntercept;