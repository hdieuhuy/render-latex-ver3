import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Exam from './Exam';
import Upload from './UploadExam';
import FormDelete from './FormDeleteExam';
import Test from './Test';

const Navbar = () => {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          {/* <Route path="/" exact>
            <FormGoExam />
          </Route> */}
          <Route path="/:examCode?" exact>
            <Exam />
          </Route>
          <Route path="/upload/exam">
            <Upload />
          </Route>
          <Route path="/delete/exam">
            <FormDelete />
          </Route>
          <Route path="/test/exam">
            <Test />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Navbar;
