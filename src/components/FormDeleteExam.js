import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Tag, message } from 'antd';

import '../styles/delete.css';
import { deleteExam, getListExam } from '../api';
import { sortName } from '../helper';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = (
  <LoadingOutlined style={{ fontSize: 80, color: '#74b9ff' }} spin />
);

const FormDelete = () => {
  const [dataMenu, setDataMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  const onDelete = async (examCode) => {
    if (examCode === 'abc' || examCode === 'example') {
      message.error(`${examCode} không cho phép xoá`);
    }

    const res = await deleteExam(examCode);
    const noti = res.data.message;

    message.success(noti);
  };

  useEffect(() => {
    getListExam()
      .then((res) => {
        const _data = get(res.data.data, 'allExam', []);

        setLoading(false);
        setDataMenu([..._data]);
      })
      .catch(() => {
        setLoading(false);
        setDataMenu([]);
      });
  }, []);

  if (loading) return <div className="loading__fullscreen">{antIcon}</div>;

  return (
    <div className="form__delete">
      <h3>
        List Exam or <Link to="/">Go to exam</Link>
      </h3>

      <div className="form__delete__listExam">
        {sortName(dataMenu).map((item, index) => {
          if (item === 'abc' || item === 'example') {
            return (
              <div className="listExam__item">
                <Tag key={index}>{item}</Tag>
              </div>
            );
          }

          return (
            <div className="listExam__item">
              <Tag closable key={index} onClose={() => onDelete(item)}>
                {item}
              </Tag>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormDelete;
