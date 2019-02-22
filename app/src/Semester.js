import React, { Component } from 'react';
import logo from './logo.svg';
import Course from './Course';

class Semester extends Component {
  constructor(props){
    super(props);
    console.log(this.props);

    this.state = {
      semester_id: this.props.semester_id,
      courses: this.props.courses,
    };
  }

  createCourses(){
    var courses = [];
    console.log("AAA");
    console.log(this.state.courses);

    for(var i=0; i<this.state.courses[0].length; i++){
      courses.push(<Course course_id={this.state.courses[0][i]} />);
    }
    return courses;
  }

  render() {
    return (
      <div class="panel-term" id="term-0">
        <div class="panel-term-header">
          <span>Term 0</span>
          <span style={{float: "right"}}>F 2019</span>
        </div>
        <ul class="panel-term-list" id="0">
          {this.createCourses()}
        </ul>
        <div class="panel-term-footer">
          <span style={{float: "right"}}>Total Credits: <span id="credit-0">0</span></span>
        </div>
      </div>
    );
  }
}

export default Semester;
