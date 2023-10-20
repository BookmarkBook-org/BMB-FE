import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from "./components/common/Header";
import Home from './components/pages/Home';
import Mypage from './components/pages/Mypage';
import Setting from './components/pages/Setting';
import styled from "styled-components";

import Login from './components/pages/login/Login';
import LoginUserInfo from './components/pages/login/LoginUserInfo';
import LoginBookmark from './components/pages/login/LoginBookmark';
import LoginMoreInfo from './components/pages/login/LoginMoreInfo';
import LoginGoogle from './components/pages/login/LoginGoogle';

function App() {
  return (
    <Router>
        <Header/>
        <ContentWrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/login' element={<Login />}>
            <Route path='/login' element={<LoginGoogle />} />
            <Route path='/login/user' element={<LoginUserInfo />} />
            <Route path='/login/upload' element={<LoginBookmark />} />
            <Route path='/login/more' element={<LoginMoreInfo />} />
          </Route>
        </Routes>
      </ContentWrapper>
      </Router>
  );
}

export default App;

const ContentWrapper = styled.div`
  overflow-y: auto; 
  height: calc(100vh - 60px);
`;