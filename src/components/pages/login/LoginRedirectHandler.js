import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const LoginRedirectHandler = () => {
  const navigate = useNavigate();
  const [isRegisteredIn, setIsRegisteredIn] = useState(false);

  useEffect(() => {
      const hash = window.location.hash.substr(1);
      const params = new URLSearchParams(hash);
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");
      const registeredIn = params.get("registeredIn") === "true";
      console.log(accessToken, refreshToken, registeredIn);

      if(accessToken || refreshToken || registeredIn) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("registeredIn", registeredIn);
      setIsRegisteredIn(registeredIn);
      }
    }, []);
    if (!isRegisteredIn) {
      return navigate("/login/user");
    } else {
      Cookies.set("loggedIn", "true");
      return navigate("/");
    }
};

export default LoginRedirectHandler;