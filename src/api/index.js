import axios from 'axios';
// var axios = require('axios');
// var qs = require('qs');
const baseUrl = 'https://node-render-exam.herokuapp.com';

const getExam = async (examCode) => {
  const res = await axios.get(`${baseUrl}/api/exam/${examCode}`);

  return res;
};

const getListExam = async () => {
  const res = await axios.get(`${baseUrl}/api/all/`);

  return res;
};

const deleteExam = async (examCode) => {
  const res = await axios.delete(`${baseUrl}/api/exam/${examCode}`);

  return res;
};

export { getExam, getListExam, deleteExam };
