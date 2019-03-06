import React, { Component, createRef } from 'react';
import Semester from './Semester';
import logo from './logo.svg';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import './style/PopupReqs.css';

class PopupReqs extends Component {
  constructor(props){
    super(props);

    this.state = {
      requirements: this.props.requirements,
      active_courses: [],
      fulfilled: false,
    };

    this.inactive_course_icon_link = "/assets/icons8-delete-96.png";
    this.active_course_icon_link = "/assets/icons8-checkmark-96.png";

    this.updateProgramReqList = this.updateProgramReqList.bind(this);
  }  

  updateProgramReqList(semesters){
    var new_active_courses = [];
    for(var semester_id in semesters){
      var current_semester_courses = semesters[semester_id].current.state.courses[0];
      new_active_courses = new_active_courses.concat(current_semester_courses);
    }
    this.setState({active_courses: new_active_courses});
  }

  isCourseActive(course_str){
    console.log(course_str);
    if(this.state.active_courses.includes(course_str)){
      return true;
    }else{
      return false;
    }
  }

  createProgramReqList(){
    var list_items = [];

    var requirements = this.props.requirements;
    // Cycle through each individual program requirement
    for(var i=0; i<requirements.length; i++){
      // Cycle through each course requirement's elements
      for(var j=0; j<requirements[i].length; j++){
        // Represents a program requirements
        var current_course = requirements[i][j];
        if(typeof current_course == "object"){
          // If the requirements is an array, means that both courses need to be satisfied
          for(var k=0; k<current_course.length; k++){
            list_items.push(<li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.isCourseActive(current_course[k]) ? this.active_course_icon_link : this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{current_course[k]}</span></li>);

            if(k+1 != current_course.length){
              list_items.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">AND</span></li>);
            }
          }

        }else if(typeof current_course == "string"){
          // Individual course, so can simply add course item and move on
          list_items.push(<li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src={this.isCourseActive(current_course) ? this.active_course_icon_link : this.inactive_course_icon_link}></img></span><span class="reqs-course-name">{current_course}</span></li>); 
        }

        // If we've reached the end of the individual program requirement, we can avoid placing a conditional item
        if(j+1 != requirements[i].length){
          list_items.push(<li class="reqs-course-conditional"><span class="reqs-conditional-text">OR</span></li>);
        }
      }

      list_items.push(<li class="reqs-course-separator"><hr></hr></li>);
    }

    return list_items;
  }

  render(){
      return (
        <div id="modal-reqs">
          <div id="modal-reqs-content">
            <span>Required</span>

            <div id="modal-reqs-list">
              <ul id="reqs-course-list">
                {this.createProgramReqList()}                
              </ul>
            </div>
          </div>
        </div>
      );
  }
}

export default PopupReqs;


/* 


                <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src="/assets/icons8-delete-96.png"></img></span><span class="reqs-course-name">CSC 111</span></li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src="/assets/icons8-delete-96.png"></img></span><span class="reqs-course-name">CSC 115</span></li>
                <li class="reqs-course-conditional"><span class="reqs-conditional-text">OR</span></li>
                <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src="/assets/icons8-delete-96.png"></img></span><span class="reqs-course-name">CSC 116</span></li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src="/assets/icons8-delete-96.png"></img></span><span class="reqs-course-name">ENGR 110</span></li>
                <li class="reqs-course-conditional"><span class="reqs-conditional-text">OR</span></li>
                <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src="/assets/icons8-delete-96.png"></img></span><span class="reqs-course-name">ENGR 112</span></li>
                <li class="reqs-course-conditional"><span class="reqs-conditional-text">AND</span></li>
                <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src="/assets/icons8-delete-96.png"></img></span><span class="reqs-course-name">ENGL 135</span></li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">MATH 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">PHYS 110</li>




*/