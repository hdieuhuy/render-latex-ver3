/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './styles/main.css';
import Navbar from './components/Navbar';
// import Exam from './components/Exam';
import 'antd/dist/antd.css';

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
