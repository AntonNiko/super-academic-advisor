import React, { Component } from 'react';
import logo from './logo.svg';
//import './App.css';
import Course from './Course';

class SemesterContainer extends Component {
  render() {
    return (
      <div class="panel-term" id="term-0">
        <div class="panel-term-header">
          <span>Term 0</span>
          <span style={{float: "right"}}>F 2019</span>
        </div>
        <ul class="panel-term-list" id="0">
          <Course />
        </ul>
        <div class="panel-term-footer">
          <span style={{float: "right"}}>Total Credits: <span id="credit-0">0</span></span>
        </div>
      </div>
    );
  }
}

export default SemesterContainer;
