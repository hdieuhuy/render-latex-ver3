import React, { useEffect, useState } from 'react';
import { Modal, message, Empty, Tooltip, Popover } from 'antd';
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
  console.log('data', data);

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

      {data?.error && <Empty description={data?.message} />}

      {listQuestion?.map((item, key) => {
        const isGeometry = '';

        return (
          <div className="item">
            <div className="question">
              <Popover
                title={item?.questionContents.map(
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
                getPopupContainer={(trigger) => trigger.parentElement}
                getTooltipContainer={(trigger) => trigger.parentElement}
              >
                <h3 className="question__title pointer">
                  {key + 1}.
                  {item?.questionContents.map(
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

              <span className="info">
                [Time: {item?.duration}, Level: {item?.level}
                {item?.questionProperties?.parametric && ', Parametric'},{' '}
                {item?.code && item?.code}]
              </span>
            </div>

            {item?.questionCategories && (
              <div className="question__categories">
                {item?.questionCategories?.map((category) => (
                  <span>{category}</span>
                ))}
              </div>
            )}

            <div className="choice">
              <Tooltip
                placement="rightTop"
                trigger={['click']}
                getPopupContainer={(trigger) => trigger.parentElement}
                getTooltipContainer={(trigger) => trigger.parentElement}
                title={item?.choices?.map((choice, index) => (
                  <p>
                    {index + 1}.{' '}
                    {(choice?.variety === 'TEXT' && choice?.content) ||
                      (choice?.variety === 'HTML' && choice?.content) ||
                      (choice?.variety === 'IMG' && (
                        <img
                          alt="img math"
                          src={choice?.content}
                          className={isGeometry && 'isGeometry'}
                        />
                      ))}
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
                getPopupContainer={(trigger) => trigger.parentElement}
                getTooltipContainer={(trigger) => trigger.parentElement}
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
                <div className="explannation pointer">
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
      })}
    </Modal>
  );
};

export default ModalExam;
