import React from "react";
import { useFetch, useLocalStorage } from 'hooks';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AUTH_TOKEN, USER } from 'constants/localstorage.constants';

/**
 * @returns  
 * session 
 * login 
 * verifyToken
 * token
 * forget-password
 * isLoading
 * 
 */

export const useAuth = () => {
  const navigate = useNavigate();
  const [error, SetError] = React.useState(null)
  const { getLocalStorage,
    setLocalStorage } = useLocalStorage();
  const onSuccess = React.useCallback((response) => {
    if (response?.token) {
      setLocalStorage(AUTH_TOKEN, response?.token);
      setLocalStorage(USER, response?.user);
      toast.success(response?.message);
      navigate("/");
    }
    else {
      toast.success(response?.message);
      // navigate('/verify-otp');
    }
  }, [navigate, setLocalStorage]);
  const onFailure = React.useCallback((error) => {
    if (error) {
      toast.error(error);
      SetError(error)
    }
  }, []);
  const session = React.useMemo(() => {
    return getLocalStorage(AUTH_TOKEN) ?? false;
  }, [getLocalStorage]);
  const userValue = React.useMemo(() => {
    return getLocalStorage(USER);
  }, [getLocalStorage]);


  const { isLoading, callFetch } = useFetch({
    initialUrl: "/login/",
    skipOnStart: true,
    onFailure,
    onSuccess,
  });

  const login = React.useCallback((data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    callFetch({
      url: "/login",
      method: "post",
      data: formData
    });

  }, [callFetch])

  const verifyToken = React.useCallback((data) => {
    callFetch({
      url: "/login/",
      method: "post",
      data: data,
      onSuccess: (res) => {
        toast.success(res.msg);
        navigate('/login');
      },
      onFailure: (err) => {
        toast.error(err.msg)
      }
    });
  }, [callFetch, navigate])

  const forgetPassword = React.useCallback((data) => {
    callFetch({
      url: "/forget-password/",
      method: "post",
      data: data,
      onSuccess: (res) => {
        toast.success(res.msg);
      },
      onFailure: (err) => {
        toast.error(err.msg)
      }
    });
  }, [callFetch])
  const logout = React.useCallback(() => {
    if (window !== undefined) {
      callFetch({
        url: "/logout",
        method: "post",
      });
      localStorage.clear();
      window.location.reload();
    }
  }, [callFetch])
  return {
    session,
    userValue,
    verifyToken,
    logout,
    login,
    forgetPassword,
    isLoading,
    error
  }
}



