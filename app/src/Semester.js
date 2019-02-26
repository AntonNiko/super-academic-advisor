import React, { Component } from 'react';
import logo from './logo.svg';
import Course from './Course';

class Semester extends Component {
  constructor(props){
    super(props);

    this.state = {
      //semester_id: this.props.semester_id,
      prev_semester: this.props.last_added_semester,
      current_units: 0,
      max_units: 9,
      courses_obj: {},
      courses: this.props.courses,
    };

    this.removeCourse = this.removeCourse.bind(this);
    this.updateCreditValue = this.updateCreditValue.bind(this);
  }

  createCourses(){
    var courses = [];

    for(var i=0; i<this.state.courses[0].length; i++){
      courses.push(<Course course_id={this.state.courses[0][i]}
                      ref={course => {this.course = course}}
                      updateCreditValue={this.updateCreditValue}
                      data = {this.props.data}/>);
    }
    return courses;
  }

  updateCreditValue(course_credit_value){
    this.setState({current_units: this.state.current_units+=course_credit_value});
  }

  addCourse(course_id, temporary = false){
    this.props.courses[0].push(course_id);
    if(!temporary){
      this.forceUpdate();
    }
  }

  removeCourse(course_id, temporary = false){
    this.props.courses[0].splice(this.props.courses[0].indexOf(course_id), 1);
    if(!temporary){
      this.forceUpdate();
    }
  }


  render() {
    return (
      <div class="panel-term" id={"term-"+this.props.semester_id}>
        <div class="panel-term-header">
          <span>{this.props.semester_id}</span>
          <span style={{float: "right"}}>{this.props.courses[2]} {this.props.courses[1]}</span>
        </div>
        <ul class="panel-term-list" id={this.props.semester_id}>
          {this.createCourses()}
        </ul>
        <div class="panel-term-footer">
          <span style={{float: "right"}}>Credits: <span id={"credit-"+this.props.semester_id}>{this.state.current_units}</span></span>
        </div>
      </div>
    );
  }
}

export default Semester;
