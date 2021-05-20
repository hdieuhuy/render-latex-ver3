import { isEmpty } from 'lodash';

export const sortName = (data) => {
  if (isEmpty(data)) return [];
  const _data = [...data];

  return _data.sort((a, b) => {
    if (a.toLowerCase() < b.toLowerCase()) {
      return -1;
    }
    if (a.toLowerCase() > b.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};
