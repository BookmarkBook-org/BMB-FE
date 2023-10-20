import React, { useState, useEffect } from "react";
import { Outlet } from 'react-router-dom';
import styled from "styled-components";

const Login = () => {
    const [title, setTitle] = useState("");
  
    useEffect(() => {
      setTitle("로그인");
    }, []);

    return (
        <Wrapper>
            <div>
            <p className="title">{title}</p>
              <Outlet context={[title, setTitle]} />
            </div>
        </Wrapper>
    );
};

export default Login;

const Wrapper = styled.div`
.title {
    color: #212529;
    font-size: 32px;
    font-family: 'Pret-Bold';
    font-weight: 700;
    line-height: 40px;
    word-wrap: break-word;
    padding-left: 170px;
    padding-right: 170px; 
  }
  .progress-bar {
    width: 100%; 
    background: #ddd; 
  }
  .hr {
    text-align: left;
    margin-left: 0;
    height: 4px; 
    background: linear-gradient(to right, #7749F8 0%, #7749F8 50%);
    transition: width 0.5s; 
  }
`