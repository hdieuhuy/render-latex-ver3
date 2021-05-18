import React from 'react';
import { Form, Input, Button } from 'antd';
import '../styles/formGo.css';

const FormGoExam = () => {
  const onFinish = (value) => {
    console.log('value', value);
  };

  return (
    <div className="form__go">
      <Form
        name="normal_login"
        className="form__go__wrapper"
        onFinish={onFinish}
      >
        <Form.Item name="examCode">
          <Input placeholder="Exam Code" />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" type="primary">
            Go To Exam
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormGoExam;
