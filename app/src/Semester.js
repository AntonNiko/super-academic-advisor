import React, { Component } from 'react';
import logo from './logo.svg';
import Course from './Course';

class Semester extends Component {
  constructor(props){
    super(props);
    //console.log(this.props);

    this.state = {
      semester_id: this.props.semester_id,
      courses: this.props.courses,
      prev_semester: this.props.last_added_semester,
    };

    const request = async() => {
      const response = await fetch("course_dir.json");
      const json = await response.json();
      const result = await this.setState({data: json});
    }
    request();

    /*fetch("course_dir.json")
      .then(response => response.json())
      .then(dataJSON => this.setState({courses_json: dataJSON}));*/
  }

  createCourses(){
    var courses = [];

    for(var i=0; i<this.state.courses[0].length; i++){
      courses.push(<Course course_id={this.state.courses[0][i]} />);
      //courses.push(<Course course_json={this.state.courses_json[this.state.courses[0][i]]} />);
    }
    return courses;
  }

  render() {
    return (
      <div class="panel-term" id={"term-"+this.state.semester_id}>
        <div class="panel-term-header">
          <span>{this.state.semester_id}</span>
          <span style={{float: "right"}}>{this.state.courses[2]} {this.state.courses[1]}</span>
        </div>
        <ul class="panel-term-list" id={this.state.semester_id}>
          {this.createCourses()}
        </ul>
        <div class="panel-term-footer">
          <span style={{float: "right"}}>Total Credits: <span id={"credit-"+this.state.semester_id}>0</span></span>
        </div>
      </div>
    );
  }
}

export default Semester;
