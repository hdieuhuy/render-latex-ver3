/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./App.css";
import parse from "html-react-parser";
// import exams from "./import";
const exams = [
  // "Lv_gte_4_1",
  // "Lv_gte_4_2",
  // "Lv_gte_4_3",
  // "Lv_gte_4_4",
  // "Lv_gte_4_5",
  // "Lv_gte_4_6",
  // "Lv_gte_4_7",
  // "Lv_gte_4_8",
  // "Lv_gte_4_9",
  // "Lv_gte_4_10",
  // "Lv_gte_4_11",

  // "Lv_gte_4_12",

  // "Lv_gte_4_13",

  // "Lv_gte_4_14",

  // "Lv_gte_4_15",
  // "Lv_gte_4_16",
  // "Lv_gte_4_17",
  // "Lv_gte_4_18",
  // "Lv_gte_4_19",
  // "Lv_gte_4_20",
  // "Lv_gte_4_21",
  // "Lv_gte_4_22",
  // "Lv_gte_4_23",
  // "Lv_gte_4_24",
  // "Lv_gte_4_25",
  // "Lv_gte_4_26",
  // "Lv_gte_4_27",
  // "Lv_gte_4_28",
  // "Lv_gte_4_29",
  // "Lv_gte_4_30",
  // "Lv_gte_4_31",
  // "Lv_gte_4_32",
  // "Lv_gte_4_33",
  // "Lv_gte_4_34",
  // "Lv_gte_4_35",
  // "Lv_gte_4_36",
  // "Lv_gte_4_37",
  // "Lv_gte_4_38",
  // "Lv_gte_4_39",
  // "Lv_gte_4_40",
  // "Lv_gte_4_41",
  // "Lv_gte_4_42",
  // "Lv_gte_4_43",
  // "Lv_gte_4_44",
  // "Lv_gte_4_45",
  // "Lv_gte_4_46",
  // "Lv_gte_4_47",
  // "Lv_gte_4_48",
  // "Lv_gte_4_49",
  // "Lv_gte_4_50",
  // "Lv_gte_4_51",

  "tuan_TN_1",
  "tuan_TN_2",
  "ex1_1",
  "ex1_2",
  "ex1_3",
  "ex1_4",
  "ex1_5",

  "ex2_1",
  "ex2_2",
  "ex2_3",
  "ex2_4",
  "ex2_5",

  "TN_1",
  "TN_2",
  "TN_3",
  "TN_4",
  "TN_5",
  "TN_6",
  "TN_7",
  "TN_8",
  "TN_9",
  "TN_10",
  "QuestionDB_dev_tn"
];

let data = null;
function App() {
  let id = window.location.pathname.split("/")[1] || "ex1_1";
  const newID = decodeURI(id);
  data = require(`./json/${newID}`);

  useEffect(() => {
    const title = document.getElementById("title");

    title.scrollIntoView();
  }, [newID]);

  const renderData = () => {
    return data.list_questions.map((item, key) => (
      <div className="item">
        <div className="question">
          <h3 className="question__title">
            {key + 1}.
            {item.question_contents.map(
              (title) =>
                (title.variety === "TEXT" && title.content) ||
                (title.variety === "HTML" && parse(title.content))
            )}
            <span className="info">
              [Time: {item.duration}, Level: {item.level}
              {item.question_properties.parametric && ", Parametric"},{" "}
              {item.code && item.code}]
            </span>
          </h3>

          {item.question_contents.map(
            (img) =>
              img.variety === "IMG" && <img alt="img math" src={img.content} />
          )}
        </div>

        {item.question_categories && (
          <div className="question__categories">{item.question_categories}</div>
        )}

        <div className="choice">
          <ul>
            {item.choices.map((choice) =>
              choice.right_choice ? (
                <li className="choice__true">
                  {choice.variety === "TEXT" ? (
                    choice.content
                  ) : (
                    <img alt="img math" src={choice.content} />
                  )}
                </li>
              ) : (
                <li className="choice">
                  {choice.variety === "TEXT" ? (
                    choice.content
                  ) : (
                    <img alt="img math" src={choice.content} />
                  )}
                </li>
              )
            )}
          </ul>
        </div>

        {item.explanations && (
          <div className="explannation">
            <h4>Lời Giải:</h4>
            {item.explanations.map(
              (data) =>
                (data.variety === "TEXT" && <p> {data.content} </p>) ||
                (data.variety === "HTML" && parse(data.content)) ||
                (data.variety === "IMG" && (
                  <img alt="img math" src={data.content} />
                ))
            )}
          </div>
        )}
      </div>
    ));
  };
  // const latex = `Hàm số đồng biến trên các khoảng của tập xác định khi và chỉ khi
  // \\begin{aligned}y'>0,\\quad \\forall x\\neq m &\\Leftrightarrow \\dfrac{-m^2+2m+3}{(x-m)^2}>0,\\quad \\forall x\\neq m\\\\
  // &\\Leftrightarrow -m^2+2m+3>0\\Leftrightarrow -1<m<3.
  // \\end{aligned}Suy ra`;

  return (
    <div className="App">
      <div className="navbar">
        {/* {latex} */}
        {/* <ul className="navbar__item navbar--section">
          <h4>Section</h4>
          {exams.map((exam, key) => {
            return (
              exam.type === "section" && (
                <li
                  key={key}
                  onClick={handleScroll}
                  className={`${newID === exam.name && "active"}`}
                >
                  <a href={exam.name}>{exam.name}</a>
                </li>
              )
            );
          })}
        </ul> */}

        {/* <ul className="navbar__item navbar--chapter">
          <h4>Chapter</h4>
          {exams.map((exam, key) => {
            return (
              exam.type === "chapter" && (
                <li
                  key={key}
                  onClick={handleScroll}
                  className={`${newID === exam.name && "active"}`}
                >
                  <a href={exam.name}>{exam.name}</a>
                </li>
              )
            );
          })}
        </ul>

        <ul className="navbar__item navbar--HK">
          <h4>HK</h4>

          {exams.map((exam, key) => {
            return (
              exam.type === "HK" && (
                <li
                  key={key}
                  onClick={handleScroll}
                  className={`${newID === exam.name && "active"}`}
                >
                  <a href={exam.name}>{exam.name}</a>
                </li>
              )
            );
          })}
        </ul> */}

        <ul className="navbar__item">
          {exams.map((exam) => (
            <li className={`${newID === exam && "active"}`}>
              <a href={exam}>{exam}</a>
            </li>
          ))}
        </ul>
      </div>

      <h3 id="title">Question</h3>

      {/* {parse(test)} */}

      <div className="Latex">{renderData()}</div>
    </div>
  );
}

export default App;
