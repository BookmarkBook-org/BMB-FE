import React from "react";
import styled from "styled-components";

const LoginInfo = () => {
    return (
        <Wrapper>
          <p className="title">dbwm</p>
        </Wrapper>
    );
};

export default LoginInfo;

const Wrapper = styled.div`
padding-left: 170px;
padding-right: 170px;
.title{
  color: #212529;
  font-size: 32px;
  font-family: Pretendard Variable;
  font-weight: 700;
  line-height: 46px;
  word-wrap: break-word;
}
`