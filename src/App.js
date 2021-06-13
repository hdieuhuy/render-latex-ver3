/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import './styles/main.css';
import Navbar from './components/Navbar';
// import Exam from './components/Exam';
import 'antd/dist/antd.css';

const configMath = `
$
\\newcommand{\\hoac}[1]{ \\left[\\begin{aligned}#1\\end{aligned}\\right.}
\\newcommand{\\heva}[1]{\\left\\{ \\begin{aligned}{#1}\\end{aligned}\\right.}
$
`;

function App() {
  return (
    <div className="App">
      <div className="configMath">{configMath}</div>

      <div className="navbar">
        <Navbar />
      </div>
    </div>
  );
}

export default App;
