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
  }  

  render(){
      return (
        <div id="modal-reqs">
          <div id="modal-reqs-content">
            <span>Program Requirements</span>

            <div id="modal-reqs-list">
              <ul id="reqs-course-list">
                <li class="reqs-course-item"><span class="reqs-checkmark-bg"><img src="/assets/icons8-delete-96.png"></img></span><span class="reqs-course-name">CSC 111</span></li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">CSC 115</li>
                <li class="reqs-course-conditional">OR</li>
                <li class="reqs-course-item">CSC 116</li>
                <li class="reqs-course-separator"><hr></hr></li>
                <li class="reqs-course-item">ENGR 110</li>
                <li class="reqs-course-conditional">OR</li>
                <li class="reqs-course-item">ENGR 112</li>
                <li class="reqs-course-item">ENGL 135</li>
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
                
              </ul>
            </div>
          </div>
        </div>
      );
  }
}

export default PopupReqs;
