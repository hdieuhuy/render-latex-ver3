import React from 'react';
import { Upload, message } from 'antd';
import '../styles/uploadExam.css';
import { InboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const baseUrl = 'https://node-render-latex.herokuapp.com/api/exam';

const Dragger = Upload.Dragger;

const UploadExam = () => {
  const props = {
    name: 'content',
    multiple: true,
    showUploadList: true,
    action: baseUrl,
    onChange(info) {
      const { file } = info;

      if (file.status === 'done' && file.response.error === false) {
        message.success(`${file.name} được upload thành công`);
        return;
      }

      if (file.status === 'done' && file.response.error === true) {
        message.error(file.response.message);
      }
    },
  };

  return (
    <div className="upload-exam">
      <h3>Upload Exam</h3>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
      </Dragger>

      <div className="go-to-upload">
        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
};

export default UploadExam;
