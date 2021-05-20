import React from 'react';
import { Form, Input, Button } from 'antd';
import '../styles/formGo.css';
import { useHistory, Link } from 'react-router-dom';

const FormGoExam = () => {
  const { push } = useHistory();

  const onFinish = (value) => {
    const { examCode } = value;
    push(`/exam/${examCode}`);
  };

  return (
    <div>
      <div className="form__go">
        <Form
          name="normal_login"
          className="form__go__wrapper"
          onFinish={onFinish}
        >
          <Form.Item name="examCode">
            <Input placeholder="eg. None_explain_4" />
          </Form.Item>

          <Form.Item>
            <Button htmlType="submit" type="primary">
              Go To Exam
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className="go-to-upload">
        <span>Or Upload here </span>
        <Link to="/upload">Upload</Link>
      </div>
    </div>
  );
};

export default FormGoExam;
