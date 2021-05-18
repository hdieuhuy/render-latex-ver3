import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Exam from '../components/Exam';
import Upload from '../components/Upload';
import FormDelete from '../components/FormDeleteExam';
import FormGoExam from './FormGoExam';

const Navbar = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/delete">Delete</Link>
            </li>
            <li>
              <Link to="/upload">Upload</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/">
            <FormGoExam />
          </Route>
          <Route path="/exam">
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
