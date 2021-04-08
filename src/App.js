/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./App.css";
import parse from "html-react-parser";
// import exams from "./import";
const exams = [
  "2D1_1",
  "2D1_2",
  "2D1_3",
  "2D1_4",
  "2D1_5",
  "2D1_6",
  "2D1_7",
  "2D1_8",
  "2D1_9",
  "2D1_10",
  "2D1_11",

  "2D1_12",

  "2D1_13",

  "2D1_14",

  "2D1_15",
  "2D1_16",
  "2D1_17",
  "2D1_18",
  "2D1_19",
  "2D1_20",
  "2D1_21",
  "2D1_22",
  "2D1_23",
  "2D1_24",
  "2D1_25",
  "2D1_26",
  "2D1_27",
  "2D1_28",
  "2D1_29",
  "2D1_30",
  "2D1_31",
  "2D1_32",
  "2D1_33",
  "2D1_34",
  "2D1_35",
  "2D1_36",
  "2D1_37",
  "2D1_38",
  "2D1_39",
  "2D1_40",
  "2D1_41",
  "2D1_42",
  "2D1_43",
  "2D1_44",
  "2D1_45",
  "2D1_46",
  "2D1_47",
  "2D1_48",
  "2D1_49",
  "2D1_50",
  "2D1_51",
  "2D1_52",
  "2D1_53",
  "2D1_54",
  "2D1_55",
  "2D1_56",
  "2D1_57",
  "2D1_58",
  "2D1_59",
  "2D1_60",
  "2D1_61",
  "2D1_62",
  "2D1_63",
  "2D1_64",
  "2D1_65",
  "2D1_66",
  "2D1_67",
  "2D1_68",
  "2D1_69",
  "2D1_70",
  "2D1_71",
  "2D1_72",
  "2D1_73",
  "2D1_74",
  "2D1_75",
  "2D1_76",
  "2D1_77",
  "2D1_78",
  "2D1_79",
  "2D1_80",
  "2D1_81",
  "2D1_82",
  "2D1_83",
  "2D1_84",
  "2D1_85",
  "2D1_86",
  "2D1_87",
  "2D1_88",
  "2D1_89",
  "2D1_90",
  "2D1_91",
  "2D1_92",
  "2D1_93",
  "2D1_94",
  "2D1_95",
  "2D1_96",
  "2D1_97",
  "2D1_98",
  "2D1_99",

  "2D1_100",
  "2D1_101",
  "2D1_102",
  "2D1_103",
  "2D1_104",
  "2D1_105",
  "2D1_106",
  "2D1_107",
  "2D1_108",
  "2D1_109",

  "2D1_110",
  "2D1_111",
  "2D1_112",
  "2D1_113",
  "2D1_114",
  "2D1_115",
  "2D1_116",
  "2D1_117",
  "2D1_118",
  "2D1_119",

  "2D1_120",
  "2D1_121",
  "2D1_122",
  "2D1_123",
  "2D1_124",
  "2D1_125",
  "2D1_126",
  "2D1_127",
  "2D1_128",
  "2D1_129",

  "2D1_130",
  "2D1_131",
  "2D1_132",
  "2D1_133",
  "2D1_134",
  "2D1_135",
  "2D1_136",
  "2D1_137",
  "2D1_138",
  "2D1_139",

  "2D1_140",
  "2D1_141",
  "2D1_142",
  "2D1_143",
  "2D1_144",
  "2D1_145",
  "2D1_146",
];

let data = null;
function App() {
  let id = window.location.pathname.split("/")[1] || "2D1_1";

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
