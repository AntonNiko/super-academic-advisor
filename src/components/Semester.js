import React, { Component } from 'react';
import Course from './Course';
import '../style/Semester.css';

class Semester extends Component {
  constructor(props){
    super(props);

    this.current_units = 0;
    this.state = {
      prev_semester: this.props.last_added_semester,
      courses: this.props.courses[0],
      year: this.props.courses[1],
      semester_id: this.props.courses[2],
      current_units: 0,
      max_units: 9,
      courses_obj: {},
    };

    // Add courses to state, to update credit
    for(var i=0; i<this.props.courses[0].length; i++){
      var course_id = this.props.courses[0][i];
      var course_credits = this.props.data[course_id][2];
      this.updateCreditValue(course_credits);
    }

    this.removeCourse = this.removeCourse.bind(this);
    this.updateCreditValue = this.updateCreditValue.bind(this);
  }

  updateCreditValue(course_credit_value){
    this.current_units+=course_credit_value;
  }

  addCourse(course_id, temporary = false){
    this.props.courses[0].push(course_id);
    if(!temporary){
      this.forceUpdate();
      this.updateCreditValue(this.props.data[course_id][2]);
      this.setState({current_units: this.current_units});
    }
  }

  removeCourse(course_id, temporary = false){
    this.props.courses[0].splice(this.props.courses[0].indexOf(course_id), 1);
    if(!temporary){
      this.forceUpdate();
      this.updateCreditValue(-this.props.data[course_id][2]);
      this.setState({current_units: this.current_units});
    }
  }

  renderCourses(){
    var courses = [];
    for(var i=0; i<this.state.courses.length; i++){
      courses.push(<Course course_id={this.state.courses[i]}
                      ref={course => {this.course = course}}
                      updateCreditValue={this.updateCreditValue}
                      data = {this.props.data}/>);
    }
    return courses;
  }

  componentDidMount(){
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