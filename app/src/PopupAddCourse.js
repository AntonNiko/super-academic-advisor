import React, { Component } from 'react';
import logo from './logo.svg';
import './style/PopupAddCourse.css';
import './style/Modal.css';

class PopupAddCourse extends Component {
  constructor(props){
    super(props);

    this.state = {

    }

  }

  render(){
    return (
      <div id="modal-add-course" class="modal modal-opaque">
        <div class="modal-content modal-draggable">
          <span class="modal-close-button">X</span>
          <h2 class="modal-title">Add Course</h2>


          <div class="modal-subtitle">
            <h3 id="modal-course-subtitle-left" class="modal-subtitle-left"><span>To select:</span></h3>
            <h3 id="modal-course-subtitle-right" class="modal-subtitle-right"><span>Selected:</span></h3>
          </div>

          <div id="modal-add-course-workplace">
            <div class="modal-table-nested" id="modal-add-course-dir" style={{height:"140px"}}>
              <div class="modal-table-content">
                <ul class="modal-table-list">
                  <li class="modal-add-course-subject">CSC</li>
                    <ul>
                      <li>CSC 110</li>
                      <li>CSC 111</li>
                      <li>CSC 115</li>
                    </ul>
                  <li class="modal-add-course-subject">ENGR</li>
                    <ul>
                      <li>ENGR 110</li>
                      <li>ENGR 120</li>
                    </ul>
                  <li class="modal-add-course-subject">MATH</li>
                    <ul>
                      <li>MATH 100</li>
                      <li>MATH 101</li>
                      <li>MATH 110</li>
                    </ul>
                </ul>
              </div>
            </div>

            <div></div>

            <div class="modal-table">

            </div>
          </div>

          <div id="modal-add-footer" class="modal-footer">
            <div class="modal-footer-buttons">
              <div class="form-group">
                <button type="button" class="btn-primary" id="modal-add-course-submit">Submit</button>
              </div>
              <div class="form-group">
                <button type="button" class="btn-danger" id="modal-add-course-delete">Delete</button>
              </div>
              <div class="form-group">
                <button type="button" class="btn-secondary modal-cancel-button" id="modal-add-course-cancel">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      </div>);
  }
}

export default PopupAddCourse;
