import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';

import { getExam } from '../api';
import { get, isEmpty } from 'lodash';

const Exam = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    getExam('None_explain_4').then((res) => {
      const _data = JSON.parse(get(res.data, 'getExam.contentExam', {}));

      setData(_data);
    });
  }, []);

  useEffect(() => {
    window.MathJax.Hub.Startup.Typeset();
  }, [data]);

  const renderData = () => {
    if (isEmpty(data)) return 'loading';

    return data.list_questions.map((item, key) => (
      <div className="item">
        <div className="question">
          <h3 className="question__title">
            {key + 1}.
            {item.question_contents.map(
              (title) =>
                (title.variety === 'TEXT' && title.content) ||
                (title.variety === 'HTML' && parse(title.content))
            )}
            <span className="info">
              [Time: {item.duration}, Level: {item.level}
              {item.question_properties.parametric && ', Parametric'},{' '}
              {item.code && item.code}]
            </span>
          </h3>

          {item.question_contents.map(
            (img) =>
              img.variety === 'IMG' && <img alt="img math" src={img.content} />
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
                  {choice.variety === 'TEXT' ? (
                    choice.content
                  ) : (
                    <img alt="img math" src={choice.content} />
                  )}
                </li>
              ) : (
                <li className="choice">
                  {choice.variety === 'TEXT' ? (
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
                (data.variety === 'TEXT' && <p> {data.content} </p>) ||
                (data.variety === 'HTML' && parse(data.content)) ||
                (data.variety === 'IMG' && (
                  <img alt="img math" src={data.content} />
                ))
            )}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="Latex">
      <h3 id="title">Question</h3>

      {renderData()}
    </div>
  );
};

export default Exam;
