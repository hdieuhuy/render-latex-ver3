import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Exam from './Exam';
import Upload from './UploadExam';
import FormDelete from './FormDeleteExam';
import FormGoExam from './FormGoExam';

const Navbar = () => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <FormGoExam />
          </Route>
          <Route path="/exam/:examCode">
            <Exam />
          </Route>
          <Route path="/upload">
            <Upload />
          </Route>
          <Route path="/delete">
            <FormDelete />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Navbar;
