import React, { Component } from 'react';
import './style/Course.css';

class Course extends Component {
  constructor(props){
    super(props);
    this.state = {
      course_obj: null,
    };
  }

  actionGetCourseContent(){
    var course_id = this.props.course_id;
    return this.props.data[course_id];
  }

  render() {
    // Check for result of Async JSON fetch request
    if(this.props.data == null){
      return <li class="panel-course" id={this.props.course_id.replace(" ","_")}></li>
    }
    var course_obj = this.actionGetCourseContent();

    return (
      <li class="panel-course" id={this.props.course_id.replace(" ","_")}>
          <div class="panel-course-header">
            <span class="panel-course-name">{this.props.course_id}</span>
            <span class="panel-course-details-icon">
              <img src=""></img>
            </span>
          </div>
          <div class="panel-course-body">
            <span class="panel-course-offered">{course_obj[3].join(", ")}</span>
            <span class="panel-course-prereqs"></span>
          </div>
          <div class="panel-course-footer">
            <span class="panel-course-credits">{course_obj[2]}</span>
          </div>
      </li>
    );
  }
}

export default Course;
