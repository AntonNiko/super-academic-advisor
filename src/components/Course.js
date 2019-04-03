import '../style/Course.css';
import React, { Component } from 'react';

class Course extends Component {
  constructor(props){
    super(props);
    this.state = {
      course_obj: null,
    };
  }

  getCourseObject() {
    for (var i=0; i<this.props.data.length; i++) {
      if (this.props.data[i]["course_str"] == this.props.course_str) {
        return this.props.data[i];
      }
    }
  }

  renderContextMenu() {
    var list = [];
    list.push(<li class="context-edit"><span>Edit</span></li>);
    list.push(<li class="context-delete"><span>Delete</span></li>);
    return (<ul>{list}</ul>);
  }

  render() {
    // Check for result of Async JSON fetch request
    if(this.props.data == null){
      return <li class="course" id={this.props.course_str.replace(" ","_")}></li>
    }

    var course_obj = this.getCourseObject();

    return (
      <li class="course" id={this.props.course_str.replace(" ","_")}>
          <div class="course-header">
            <span class="course-name">{this.props.course_str}</span>
            <span class="course-details-icon">
              <img src="/assets/icons8-ellipsis-filled-48.png"></img>
            </span>
            <span class="course-context-menu">{this.renderContextMenu()}</span>
          </div>
          <div class="course-body">
            <span class="course-offered">{course_obj["offered"].join(", ")}</span>
            <span class="course-prereqs"></span>
          </div>
          <div class="course-footer">
            <span class="course-credits">{course_obj["credits"].toFixed(1)}</span>
          </div>
      </li>
    );
  }
}

export default Course;
