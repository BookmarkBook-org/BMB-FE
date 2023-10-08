import React from "react";
import styled from "styled-components";

const Title = () => {
    return (
        <Wrapper>
          <p>마이페이지</p>
        </Wrapper>
    );
};

export default Title;

const Wrapper = styled.div`
color: #212529;
font-size: 32px;
font-family: Pretendard Variable;
font-weight: 700;
line-height: 46px;
word-wrap: break-word
`