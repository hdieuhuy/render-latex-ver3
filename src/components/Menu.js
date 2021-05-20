import { isEmpty } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Skeleton } from 'antd';
import '../styles/menu.css';
import { sortName } from '../helper';

const MenuHeader = ({ data = [], currentActive }) => {
  const { push } = useHistory();

  const redirectToExam = (value) => {
    push(`/${value}`);
  };

  if (isEmpty(data))
    return (
      <div>
        <Skeleton />
      </div>
    );

  return (
    <div>
      <ul className="menu__header">
        {sortName(data).map((item, index) => {
          const isActive = item === currentActive;

          if (item === 'abc' || item === 'example') return <></>;

          return (
            <li
              key={index}
              onClick={() => redirectToExam(item)}
              className={`menu__header__${isActive && 'isActive'}`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuHeader;
