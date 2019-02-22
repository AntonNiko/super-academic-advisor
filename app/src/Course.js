import React, { Component } from 'react';
import logo from './logo.svg';

class Course extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: null
    };

    fetch("course_dir.json")
      .then(response => response.json())
      .then(dataJSON => this.setState({data: dataJSON}));
  }

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

  componentDidMount(){
    fetch("course_dir.json")
      .then(response => response.json())
      .then(dataJSON => this.setState({data: dataJSON}));
  }
}

export default Course;
