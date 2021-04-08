/* eslint-disable no-mixed-operators */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from "react";
import "./App.css";
import parse from "html-react-parser";
// import exams from "./import";
const exams = [
  "2D_1",
  "2D_2",
  "2D_3",
  "2D_4",
  "2D_5",
  "2D_6",
  "2D_7",
  "2D_8",
  "2D_9",
  "2D_10",
  "2D_11",

  "2D_12",

  "2D_13",

  "2D_14",

  "2D_15",
  "2D_16",
  "2D_17",
  "2D_18",
  "2D_19",
  "2D_20",
  "2D_21",
  "2D_22",
  "2D_23",
  "2D_24",
  "2D_25",
  "2D_26",
  "2D_27",
  "2D_28",
  "2D_29",
  "2D_30",
  "2D_31",
  "2D_32",
  "2D_33",
  "2D_34",
  "2D_35",
  "2D_36",
  "2D_37",
  "2D_38",
  "2D_39",
  "2D_40",
  "2D_41",
  "2D_42",
  "2D_43",
  "2D_44",
  "2D_45",
  "2D_46",
  "2D_47",
  "2D_48",
  "2D_49",
  "2D_50",
  "2D_51",
  "2D_52",
  "2D_53",
  "2D_54",
  "2D_55",
  "2D_56",
  "2D_57",
  "2D_58",
  "2D_59",
  "2D_60",
  "2D_61",
  "2D_62",
  "2D_63",
  "2D_64",
  "2D_65",
  "2D_66",
  "2D_67",
  "2D_68",
  "2D_69",
  "2D_70",
  "2D_71",
  "2D_72",
  "2D_73",
  "2D_74",
  "2D_75",
  "2D_76",
  "2D_77",
  "2D_78",
  "2D_79",
  "2D_80",
  "2D_81",
  "2D_82",
  "2D_83",
  "2D_84",
  "2D_85",
  "2D_86",
  "2D_87",
  "2D_88",
  "2D_89",
  "2D_90",
  "2D_91",
  "2D_92",
  "2D_93",
  "2D_94",
  "2D_95",
  "2D_96",
  "2D_97",
  "2D_98",
  "2D_99",

  "2D_100",
  "2D_101",
  "2D_102",
  "2D_103",
  "2D_104",
  "2D_105",
  "2D_106",
  "2D_107",
  "2D_108",
  "2D_109",

  "2D_110",
  "2D_111",
  "2D_112",
  "2D_113",
  "2D_114",
  "2D_115",
  "2D_116",
  "2D_117",
  "2D_118",
  "2D_119",

  "2D_120",
  "2D_121",
  "2D_122",
  "2D_123",
  "2D_124",
  "2D_125",
  "2D_126",
  "2D_127",
  "2D_128",
  "2D_129",

  "2D_130",
  "2D_131",
  "2D_132",
  "2D_133",
  "2D_134",
  "2D_135",
  "2D_136",
  "2D_137",
  "2D_138",
  "2D_139",

  "2D_140",
  "2D_141",
  "2D_142",
  "2D_143",
  "2D_144",
  "2D_145",
  "2D_146",
  "2D_147",
  "2D_148",
  "2D_149",
  "2D_150",
];

let data = null;
function App() {
  let id = window.location.pathname.split("/")[1] || "2D_1";

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
            (img) => img.variety === "IMG" && <img alt="img math" src={img.content} />
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
                (data.variety === "IMG" && <img alt="img math" src={data.content} />)
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
