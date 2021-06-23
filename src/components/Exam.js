import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Empty, Popover, Input, Button, Tooltip } from 'antd';
import { LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons';

import { get, isEmpty } from 'lodash';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getExam, getListExam } from '../api';
import '../styles/exam.css';
import MenuHeader from './Menu';
import ModalExam from './ModalExam';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 80, color: '#74b9ff' }} spin />
);

const Exam = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [dataMenu, setDataMenu] = useState([]);
  const [questionCode, setQuestionCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { duration, code, rank, name } = data;
  const { push } = useHistory();

  const { examCode = 'example' } = useParams();

  const openModal = (questionCode) => {
    setQuestionCode(questionCode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // get Exam
  useEffect(() => {
    if (!examCode) return;
    setLoading(true);

    getExam(examCode)
      .then((res) => {
        const _data = JSON.parse(get(res.data, 'getExam.contentExam', {}));

        setData(_data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setData({});
      });
  }, [examCode]);

  // reload Mathjax
  useEffect(() => {
    window.MathJax.Hub.Startup.Typeset();
  }, [data, loading]);

  // get list ExamCode
  useEffect(() => {
    getListExam().then((res) => {
      const _data = get(res.data, 'allExam', []);

      setDataMenu([..._data]);
    });
  }, []);

  useEffect(() => {
    const configMacros = `$
    \\newcommand{\\hoac}[1]{ \\left[\\begin{aligned}#1\\end{aligned}\\right.}
    \\newcommand{\\heva}[1]{\\left\\{ \\begin{aligned}{#1}\\end{aligned}\\right.}
    $`;

    document.getElementById('config_math').innerHTML = configMacros;
  });

  const onSearch = (value) => {
    push(`/exam/${value}`);
  };

  const title = <div>Code: {code && code}</div>;

  const content = (
    <div className="content__icon">
      <p>Name: {(name && name.split('\\').pop()) || name}</p>
      <p>Duration: {duration && duration}</p>
      <p>Rank: {rank && rank}</p>
      <Input.Search
        placeholder="eg. None_explain_4"
        onSearch={onSearch}
        style={{ width: 200 }}
      />

      <div className="info">
        <Link to="/upload/exam">Upload Exam</Link>
        <span>Or</span>
        <Link to="/delete/exam">Delete Exam</Link>
      </div>
    </div>
  );

  const renderData = () => {
    if (loading) return <div className="loading__fullscreen">{antIcon}</div>;

    if (isEmpty(data))
      return <Empty description="Không tìm thấy trong database" />;

    return data?.list_questions.map((item, key) => {
      const isGeometry = '';

      return (
        <div className="item">
          <div className="question">
            <Popover
              title={item?.question_contents.map(
                (title) =>
                  (title.variety === 'TEXT' && title.content) ||
                  (title.variety === 'HTML' && parse(title.content)) ||
                  (title.variety === 'IMG' && (
                    <img
                      alt="img math"
                      src={title.content}
                      className={isGeometry && 'isGeometry'}
                    />
                  ))
              )}
              placement="topLeft"
              trigger={['click']}
            >
              <h3 className="question__title pointer">
                {key + 1}.
                {item?.question_contents.map(
                  (title) =>
                    (title.variety === 'TEXT' && title.content) ||
                    (title.variety === 'HTML' && parse(title.content)) ||
                    (title.variety === 'IMG' && (
                      <img
                        alt="img math"
                        src={title.content}
                        className={isGeometry && 'isGeometry'}
                      />
                    ))
                )}
              </h3>
            </Popover>

            <p className="info">
              [Time: {item?.duration}, Level: {item?.level}
              {item?.question_properties?.parametric && ', Parametric'},{' '}
              {item?.code && item?.code}]
            </p>
          </div>

          {item?.question_categories && (
            <div className="question__categories">
              {item?.question_categories.map((category) => (
                <span>{category}</span>
              ))}
            </div>
          )}

          <div className="choice">
            <Tooltip
              placement="rightTop"
              trigger={['click']}
              title={item?.choices?.map((choice, index) => (
                <p>
                  {index + 1}.{' '}
                  {choice?.variety === 'TEXT' ? (
                    choice?.content
                  ) : (
                    <img
                      alt="img math"
                      src={choice?.content}
                      className={isGeometry && 'isGeometry'}
                    />
                  )}
                </p>
              ))}
            >
              <ul className="pointer">
                {item?.choices?.map((choice) =>
                  choice?.right_choice ? (
                    <li className="choice__true">
                      {(choice?.variety === 'TEXT' && choice?.content) ||
                        (choice?.variety === 'HTML' && choice?.content) ||
                        (choice?.variety === 'IMG' && (
                          <img
                            alt="img math"
                            src={choice?.content}
                            className={isGeometry && 'isGeometry'}
                          />
                        ))}
                    </li>
                  ) : (
                    <li className="choice">
                      {(choice?.variety === 'TEXT' && choice?.content) ||
                        (choice?.variety === 'HTML' && choice?.content) ||
                        (choice?.variety === 'IMG' && (
                          <img
                            alt="img math"
                            src={choice?.content}
                            className={isGeometry && 'isGeometry'}
                          />
                        ))}
                    </li>
                  )
                )}
              </ul>
            </Tooltip>

            <div className="action">
              <Button type="primary" onClick={() => openModal(item.code)}>
                Đổi câu hỏi
              </Button>
            </div>
          </div>

          {item?.solves && (
            <Popover
              trigger={['click']}
              title={item?.solves.map(
                (data) =>
                  (data?.variety === 'TEXT' && <p> {data?.content} </p>) ||
                  (data?.variety === 'HTML' && parse(data?.content)) ||
                  (data?.variety === 'IMG' && (
                    <img
                      className={isGeometry && 'isGeometry'}
                      alt="img math"
                      src={data?.content}
                    />
                  ))
              )}
            >
              <div className="solves">
                <h4>Phương pháp giải:</h4>
                {item?.solves.map(
                  (data) =>
                    (data?.variety === 'TEXT' && <p> {data?.content} </p>) ||
                    (data?.variety === 'HTML' && parse(data?.content)) ||
                    (data?.variety === 'IMG' && (
                      <img
                        className={isGeometry && 'isGeometry'}
                        alt="img math"
                        src={data?.content}
                      />
                    ))
                )}
              </div>
            </Popover>
          )}

          {item?.explanations && (
            <Popover
              trigger={['click']}
              title={item?.explanations.map(
                (data) =>
                  (data?.variety === 'TEXT' && <p> {data?.content} </p>) ||
                  (data?.variety === 'HTML' && parse(data?.content)) ||
                  (data?.variety === 'IMG' && (
                    <img
                      className={isGeometry && 'isGeometry'}
                      alt="img math"
                      src={data?.content}
                    />
                  ))
              )}
            >
              <div className="explannation">
                <h4>Lời Giải:</h4>
                {item?.explanations.map(
                  (data) =>
                    (data?.variety === 'TEXT' && <p> {data?.content} </p>) ||
                    (data?.variety === 'HTML' && parse(data?.content)) ||
                    (data?.variety === 'IMG' && (
                      <img
                        className={isGeometry && 'isGeometry'}
                        alt="img math"
                        src={data?.content}
                      />
                    ))
                )}
              </div>
            </Popover>
          )}
        </div>
      );
    });
  };

  return (
    <div className="Latex">
      <div id="config_math"></div>

      <MenuHeader data={[...dataMenu]} currentActive={examCode} />

      {!loading && <h3 id="title">Question</h3>}
      {!loading && (
        <div id="infomation-icon">
          <Popover
            content={content}
            title={title}
            trigger="click"
            placement="left"
            getPopupContainer={(trigger) => trigger.parentElement}
            getTooltipContainer={(trigger) => trigger.parentElement}
            zIndex={1000}
          >
            <InfoCircleOutlined style={{ fontSize: 24 }} />
          </Popover>
        </div>
      )}

      {renderData()}

      <ModalExam
        showModal={showModal}
        questionCode={questionCode}
        setQuestionCode={setQuestionCode}
        openModal={openModal}
        closeModal={closeModal}
      />
    </div>
  );
};

export default Exam;
