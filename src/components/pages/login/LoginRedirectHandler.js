import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    const accessToken = getCookie("accessToken");
    const refreshToken = getCookie("refreshToken");

    console.log(accessToken, refreshToken);

    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    }
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  }, [navigate]);

  return   (
   navigate("/login/user")
  )
};

export default LoginRedirectHandler;