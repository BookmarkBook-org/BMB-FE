import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import styled from "styled-components";
import LoginGoogle from "./LoginGoogle";
import LoginBookmark from "./LoginBookmark";

const Login = () => {
    return (
        <Wrapper>
            <Routes>
                <Route path='/' element={<LoginGoogle />} />
                <Route path='/upload' element={<LoginBookmark />} />
            </Routes>
        </Wrapper>
    );
};

export default Login;

const Wrapper = styled.div`
`