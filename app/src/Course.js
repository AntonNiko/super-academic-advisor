import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';

class Course extends Component {
  render() {
    return (
      <li class="panel-course" id="CSC_111">
        <a href="#">
          <div class="panel-course-header">
            <span class="panel-course-name">CSC 111</span>
            <span class="panel-course-details-icon">
              <img src=""></img>
            </span>
          </div>
          <div class="panel-course-body">
            <span class="panel-course-offered">F, Sp, Su</span>
            <span class="panel-course-prereqs"></span>
          </div>
          <div class="panel-course-footer">
            <span class="panel-course-credits">1.5</span>
          </div>
        </a>
      </li>
    );
  }
}

export default Course;
