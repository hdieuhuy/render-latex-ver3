import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Exam from './Exam';
import Upload from './UploadExam';
import FormDelete from './FormDeleteExam';

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
        </Switch>
      </div>
    </Router>
  );
};

export default Navbar;
