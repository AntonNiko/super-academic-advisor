import '../style/Semester.css';
import React, { Component } from 'react';
import Course from './Course';

class Semester extends Component {
  constructor(props) {
    super(props);

    this.current_units = 0;
    this.state = {
      prev_semester: this.props.last_added_semester,
      year: this.props.courses[1],
      semester_id: this.props.courses[2],
      current_units: 0,
      max_units: 9,
      courses_obj: {},
    };

    this.courses = [];

    this.removeCourse = this.removeCourse.bind(this);
    this.updateCreditValue = this.updateCreditValue.bind(this);
  }

  updateCreditValue(course_credit_value) {
    this.current_units+=course_credit_value;
  }

  addCourse(course_str, temporary = false) {
    this.courses.push(course_str);

    if(!temporary) {
      this.forceUpdate();
      this.updateCreditValue(this.getCourseObjectByString(course_str)["credits"]);
      this.setState({current_units: this.current_units});
    }
  }

  removeCourse(course_str, temporary = false) {
    this.courses.splice(this.courses.indexOf(course_str), 1);

    if(!temporary) {
      this.forceUpdate();
      this.updateCreditValue(-this.getCourseObjectByString(course_str)["credits"]);
      this.setState({current_units: this.current_units});
    }
  }

  getCourseObjectByString(course_str) {
    for (var i=0; i<this.props.data.length; i++) {
      if (this.props.data[i]["course_str"] == course_str) {
        return this.props.data[i];
      }
    }
  }

  renderCourses() {
    var courses = [];
    for(var i=0; i<this.courses.length; i++) {
      courses.push(<Course course_str={this.courses[i]}
                      ref={course => {this.course = course}}
                      updateCreditValue={this.updateCreditValue}
                      data = {this.props.data}/>);
    }

    return courses;
  }

  componentDidMount() {
    this.setState({current_units: this.current_units});
  }

  render() {
    return (
      <div class="panel-term" id={"term-"+this.props.semester_id}>
        <div class="panel-term-header">
          <span>{this.props.semester_id}</span>
          <span style={{float: "right"}}>{this.state.semester_id} {this.state.year}</span>
        </div>
        <div class="panel-term-subheader">
        <span style={{float: "right"}}><span id={"credit-"+this.props.semester_id}>{this.state.current_units.toFixed(1)}</span></span>
        </div>
        <ul class="panel-term-list ui-sortable" id={this.props.semester_id}>
          {this.renderCourses()}
        </ul>
        <div class="panel-term-footer">

        </div>
      </div>
    );
  }
}

export default Semester;
