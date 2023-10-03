import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

import Header from "./components/common/Header";

import Home from './components/pages/Home';
import Mypage from './components/pages/Mypage';
import Setting from './components/pages/Setting';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path="/setting" element={<Setting />} />
      </Routes>
    </Router>
  );
}

export default App;
