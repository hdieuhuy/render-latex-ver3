import React, { useEffect, useState } from 'react';
import parse from 'html-react-parser';
import { Empty, Popover, Input, Button } from 'antd';
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

    return data.list_questions.map((item, key) => {
      const isGeometry = item.question_categories.find(
        (question) => question === 'math_12_geometry' || question === 'math_11_geometry'
      );

      return (
        <div className="item">
          <div className="question">
            <h3 className="question__title">
              {key + 1}.
              {item?.question_contents.map(
                (title) =>
                  (title.variety === 'TEXT' && title.content) ||
                  (title.variety === 'HTML' && parse(title.content))
              )}
              <span className="info">
                [Time: {item?.duration}, Level: {item?.level}
                {item?.question_properties?.parametric && ', Parametric'},{' '}
                {item?.code && item?.code}]
              </span>
            </h3>

            {item?.question_contents?.map(
              (img) =>
                img.variety === 'IMG' && (
                  <img alt="img math" src={img.content} className={isGeometry && 'isGeometry'} />
                )
            )}
          </div>

          {item?.question_categories && (
            <div className="question__categories">
              {item?.question_categories.map((category) => (
                <span>{category}</span>
              ))}
            </div>
          )}

          <div className="choice">
            <ul>
              {item?.choices?.map((choice) =>
                choice?.right_choice ? (
                  <li className="choice__true">
                    {choice?.variety === 'TEXT' ? (
                      choice?.content
                    ) : (
                      <img alt="img math" src={choice?.content} className={isGeometry && 'isGeometry'} />
                    )}
                  </li>
                ) : (
                  <li className="choice">
                    {choice?.variety === 'TEXT' ? (
                      choice?.content
                    ) : (
                      <img alt="img math" src={choice?.content} className={isGeometry && 'isGeometry'} />
                    )}
                  </li>
                )
              )}
            </ul>

            <div className="action">
              <Button type="primary" onClick={() => openModal(item.code)}>
                Đổi câu hỏi
              </Button>
            </div>
          </div>

          {item?.explanations && (
            <div className="explannation">
              <h4>Lời Giải:</h4>
              {item?.explanations.map(
                (data) =>
                  (data?.variety === 'TEXT' && <p> {data?.content} </p>) ||
                  (data?.variety === 'HTML' && parse(data?.content)) ||
                  (data?.variety === 'IMG' && (
                    <img className={isGeometry && 'isGeometry'} alt="img math" src={data?.content} />
                  ))
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="Latex">
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
