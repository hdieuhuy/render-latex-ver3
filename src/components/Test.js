import React, { useEffect } from 'react';

// \\newcommand{\\heva}[1]{\\left\\{ \\begin{aligned}{#1}\\end{aligned}\\right.}
// \\newcommand{\\hoac}[1]{ \\left[\\begin{aligned}#1\\end{aligned}\\right.}

const latex = `$

\\hoac{a+b=1 \\\\ c+d=2}

$`;

// const text = `$a+b = 1$`;
// const test = `$\\newcommand{\\heva}[1]{\\left\\{ \\begin{aligned}#1\\end{aligned}\\right.}$`;

const Test = () => {
  // reload Mathjax

  useEffect(() => {
    const configMacros = () => {
      return `
      $
      \\newcommand{\\hoac}[1]{ \\left[\\begin{aligned}#1\\end{aligned}\\right.}
      \\newcommand{\\heva}[1]{\\left\\{ \\begin{aligned}{#1}\\end{aligned}\\right.}
      $
    `;
    };

    document.getElementById('config_math').innerHTML = configMacros();
  });

  useEffect(() => {
    window.MathJax.Hub.Startup.Typeset();
  });

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '120px',
      }}
    >
      <div id="config_math"></div>
      {latex}
      {/* {text} */}
      {/* {test} */}

      {/* {latexabc} */}

      {/* <p>{hoac}</p> */}
    </div>
  );
};

export default Test;
