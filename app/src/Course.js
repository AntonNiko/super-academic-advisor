import React, { Component } from 'react';
import logo from './logo.svg';

class Course extends Component {
  constructor(props){
    super(props);
    this.state = {
      course_id: this.props.course_id,
      data: null,
      course_obj: null,
    };

    const request = async() => {
      const response = await fetch("course_dir.json");
      const json = await response.json();
      const result = await this.setState({data: json});
    }
    request();
  }

  returnCourseContent(){
    var course_id = this.state.course_id;
    return this.state.data[course_id];
  }

  render() {
    // Check for result of Async JSON fetch request
    if(this.state.data == null){
      return <li class="panel-course" id={this.state.course_id.replace(" ","_")}></li>
    }
    var course_obj = this.returnCourseContent();
    
    return (
      <li class="panel-course" id={this.state.course_id.replace(" ","_")}>
        <a href="#">
          <div class="panel-course-header">
            <span class="panel-course-name">{this.state.course_id}</span>
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
