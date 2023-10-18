import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from "./components/common/Header";
import Home from './components/pages/Home';
import Mypage from './components/pages/Mypage';
import Setting from './components/pages/Setting';
import styled from "styled-components";
import Login from './components/pages/login/Login';

function App() {
  return (
    <Router>
        <Header/>
        <ContentWrapper>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/login' element={<Login />} />
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