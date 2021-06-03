import React, { useEffect, useState } from 'react';
import { Modal, message } from 'antd';
import parse from 'html-react-parser';
import { gql, useLazyQuery } from '@apollo/client';
import { LoadingOutlined } from '@ant-design/icons';

const getQuestion = gql`
  query ($questionCode: String!, $questionChangeExists: [String]!) {
    getQuestion(
      questionCode: $questionCode
      questionChangeExists: $questionChangeExists
    ) {
      question {
        code
        description
        level
        duration
        questionContents {
          content
          variety
        }
        choices {
          code
          content
          variety
          rightChoice
        }
        explanations {
          content
          variety
        }
        questionCategories
      }
      questionExists
    }
  }
`;

const antIcon = (
  <LoadingOutlined style={{ fontSize: 80, color: '#74b9ff' }} spin />
);

const ModalExam = ({
  questionCode,
  setQuestionCode,
  showModal,
  closeModal,
}) => {
  const [questionExist, setQuestionExist] = useState([]);

  const handleChangeQuestion = () => {
    if (questionExist.length <= 0) {
      message.error('Không thể đổi câu hỏi!');
      return;
    }

    getListQuestion({
      variables: {
        questionCode,
        questionChangeExists: questionExist,
      },
    });
  };

  const _closeModal = () => {
    setQuestionCode('');
    setQuestionExist([]);
    closeModal();
  };

  const [getListQuestion, { data, loading }] = useLazyQuery(getQuestion, {
    fetchPolicy: 'network-only',
  });

  const listQuestion = data?.getQuestion?.question;
  const listQuestionExist = data?.getQuestion?.questionExists;

  useEffect(() => {
    if (!questionCode) return;

    getListQuestion({
      variables: {
        questionCode,
        questionChangeExists: [],
      },
    });
  }, [getListQuestion, questionCode]);

  // reload Mathjax
  useEffect(() => {
    window.MathJax.Hub.Startup.Typeset();
  }, [data, loading]);

  useEffect(() => {
    if (!listQuestionExist) return;

    setQuestionExist(listQuestionExist);
  }, [listQuestionExist]);

  return (
    <Modal
      visible={showModal}
      onOk={handleChangeQuestion}
      onCancel={_closeModal}
      okButtonProps={{ loading }}
      okText="Đổi câu hỏi"
      cancelText="Huỷ"
      width="100%"
    >
      <h2>Danh Sách Câu hỏi </h2>

      {loading && <div className="loading__fullscreen">{antIcon}</div>}

      {listQuestion?.map((item, key) => {
        const isGeometry = item.question_categories.find(
          (question) => question === 'math_12_geometry' || question === 'math_11_geometry'
        );

        return (
          <div className="item">
            <div className="question">
              <h3 className="question__title">
                {key + 1}.
                {item?.questionContents.map(
                  (title) =>
                    (title.variety === 'TEXT' && title.content) ||
                    (title.variety === 'HTML' && parse(title.content))
                )}
                <span className="info">
                  [Time: {item?.duration}, Level: {item?.level}
                  {item?.questionProperties?.parametric && ', Parametric'},{' '}
                  {item?.code && item?.code}]
                </span>
              </h3>

              {item?.questionContents?.map(
                (img) =>
                  img.variety === 'IMG' && (
                    <img alt="img math" src={img.content} />
                  )
              )}
            </div>

            {item?.questionCategories && (
              <div className="question__categories">
                {item?.questionCategories?.map((category) => (
                  <span>{category}</span>
                ))}
              </div>
            )}

            <div className="choice">
              <ul>
                {item?.choices?.map((choice) =>
                  choice?.rightChoice ? (
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
                        <img alt="img math" src={choice?.content} />
                      )}
                    </li>
                  )
                )}
              </ul>
            </div>

            {item?.explanations && (
              <div className="explannation">
                <h4>Lời Giải:</h4>
                {item?.explanations.map(
                  (data) =>
                    (data?.variety === 'TEXT' && <p> {data?.content} </p>) ||
                    (data?.variety === 'HTML' && parse(data?.content)) ||
                    (data?.variety === 'IMG' && (
                      <img alt="img math" src={data?.content} className={isGeometry && 'isGeometry'} />
                    ))
                )}
              </div>
            )}
          </div>
        );
      })}
    </Modal>
  );
};

export default ModalExam;
