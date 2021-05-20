import axios from 'axios';
// var axios = require('axios');
// var qs = require('qs');
const baseUrl = 'https://node-render-latex.herokuapp.com';

const getExam = async (examCode) => {
  const res = await axios.get(`${baseUrl}/api/exam/${examCode}`);

  return res;
};

export { getExam };
