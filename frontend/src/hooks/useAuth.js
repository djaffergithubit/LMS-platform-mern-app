import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectToken, setToken } from '../states/authTokenSlice';
import axios from 'axios';

const useAuth = () => {
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token) {
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenPayload.exp * 1000; // Convert to milliseconds

        if (Date.now() >= expirationTime) {
          dispatch(setToken(''));
          navigate('/log-in');
          alert("Your session has expired. Please log in again.")
        }
      }
    };

    checkTokenExpiration();

    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response && error.response.status === 401) {
          dispatch(setToken(''));
          navigate('/log-in');
          alert("Your session has expired. Please log in again.")
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [token, dispatch, navigate]);
};

export default useAuth;
