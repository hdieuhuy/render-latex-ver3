import React, { useEffect } from 'react';

// \\newcommand{\\heva}[1]{\\left\\{ \\begin{aligned}{#1}\\end{aligned}\\right.}
// \\newcommand{\\hoac}[1]{ \\left[\\begin{aligned}#1\\end{aligned}\\right.}

const latex = `Cho hàm số $f(x)=\\heva{2x-1 \\quad \\text{khi} \\quad x \\ge 1 \\\\ 3x^2-2 \\quad \\text{khi} \\quad x \\lt 1}.$ Giả sử $F$ là nguyên hàm của $f$ trên $\\mathbb{R}$ thỏa mãn $F(0)=2$. Giá trị của $F(-1)+2F(2)$ bằng`;

// const text = `$a+b = 1$`;
// const test = `$
// Cho hàm số $f(x)=\\heva{2x-1 \\quad \\text{khi} \\quad x \\ge 1 \\\\ 3x^2-2 \\quad \\text{khi} \\quad x \\lt 1}.$ Giả sử $F$ là nguyên hàm của $f$ trên $\\mathbb{R}$ thỏa mãn $F(0)=2$. Giá trị của $F(-1)+2F(2)$ bằng$`;

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
