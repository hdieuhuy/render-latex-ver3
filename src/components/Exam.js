import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Empty, Popover, Input } from 'antd';
import { LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { get, isEmpty } from 'lodash';
import { useParams } from 'react-router-dom';

import { getExam } from '../api';
import '../styles/exam.css';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 80, color: '#74b9ff' }} spin />
);

const Exam = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { duration, code, rank, name } = data;

  const { examCode } = useParams();

  useEffect(() => {
    if (!examCode) return;
    setLoading(true);

    getExam(examCode)
      .then((res) => {
        console.log('res', res);
        const _data = JSON.parse(get(res.data, 'getExam.contentExam', {}));

        setData(_data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [examCode]);

  useEffect(() => {
    window.MathJax.Hub.Startup.Typeset();
  }, [data, loading]);

  const title = <div>Code: {code && code}</div>;

  const content = (
    <div>
      <p>Name: {name && name.split('\\').pop()}</p>
      <p>Duration: {duration && duration}</p>
      <p>Rank: {rank && rank}</p>
    </div>
  );

  const renderData = () => {
    if (loading) return <div className="loading__fullscreen">{antIcon}</div>;

    if (isEmpty(data))
      return <Empty description="Không tìm thấy trong database" />;

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
      <Popover content={content} title={title} trigger="click" placement="left">
        <InfoCircleOutlined style={{ fontSize: 24 }} id="infomation-icon" />
      </Popover>

      {renderData()}
    </div>
  );
};

export default Exam;
