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
            <div class="modal-table-nested" id="modal-add-course-dir">
              <div class="modal-table-content">
                <ul class="modal-table-list">
                  <li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">CSC</span></li>
                    <ul class="modal-course-group">
                      <li class="modal-course-item"><span>CSC 110</span></li>
                      <li class="modal-course-item"><span>CSC 111</span></li>
                      <li class="modal-course-item"><span>CSC 115</span></li>
                    </ul>
                  <li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">ENGR</span></li>
                    <ul class="modal-course-group">
                      <li class="modal-course-item"><span>ENGR 110</span></li>
                      <li class="modal-course-item"><span>ENGR 120</span></li>
                    </ul>
                  <li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">MATH</span></li>
                    <ul class="modal-course-group">
                      <li class="modal-course-item"><span>MATH 100</span></li>
                      <li class="modal-course-item"><span>MATH 101</span></li>
                      <li class="modal-course-item"><span>MATH 110</span></li>
                    </ul>
                </ul>
              </div>
            </div>

            <div id="modal-add-course-transfer-actions">
              <div id="modal-add-course-action-container">
                <div>
                  <button type="button" class="btn-action" id="modal-add-course-action-add">Move Courses</button>
                  <button type="button" class="btn-action" id="modal-add-course-action-remove">Remove Courses</button>
                </div>
              </div>
            </div>

            <div class="modal-table-nested" id="modal-add-course-results">
            </div>
          </div>

          <div id="modal-add-footer" class="modal-footer">
            <div class="modal-footer-buttons">
              <div class="form-group">
                <button type="button" class="btn-primary" id="modal-add-course-submit">Add Courses</button>
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
