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
                      <li class="modal-course-item course-item-unselected"><span>CSC 110</span></li>
                      <li class="modal-course-item course-item-unselected"><span>CSC 111</span></li>
                      <li class="modal-course-item course-item-unselected"><span>CSC 115</span></li>
                    </ul>
                  <li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">ENGR</span></li>
                    <ul class="modal-course-group">
                      <li class="modal-course-item course-item-unselected"><span>ENGR 110</span></li>
                      <li class="modal-course-item course-item-unselected"><span>ENGR 120</span></li>
                    </ul>
                  <li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">MATH</span></li>
                    <ul class="modal-course-group">
                      <li class="modal-course-item course-item-unselected"><span>MATH 100</span></li>
                      <li class="modal-course-item course-item-unselected"><span>MATH 101</span></li>
                      <li class="modal-course-item course-item-unselected"><span>MATH 110</span></li>
                    </ul>
                  <li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">MATH</span></li>
                    <ul class="modal-course-group">
                      <li class="modal-course-item course-item-unselected"><span>MATH 100</span></li>
                      <li class="modal-course-item course-item-unselected"><span>MATH 101</span></li>
                      <li class="modal-course-item course-item-unselected"><span>MATH 110</span></li>
                    </ul>
                    <li class="modal-add-course-subject"><span class="modal-chevron-collapsed"></span><span class="modal-list-title">MATH</span></li>
                      <ul class="modal-course-group">
                        <li class="modal-course-item course-item-unselected"><span>MATH 100</span></li>
                        <li class="modal-course-item course-item-unselected"><span>MATH 101</span></li>
                        <li class="modal-course-item course-item-unselected"><span>MATH 110</span></li>
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
              <div class="modal-table-content" id="modal-add-course-results-content">
                <ul class="modal-table-list" id="modal-add-course-results-list">
                  <li class="modal-add-course-selected-course">
                    <div class="modal-add-course-selected-title"><span>ENGR 141</span></div>
                    <div class="modal-add-course-selected-actions">
                      <ul class="dropdown-select-small">
                        <li>
                          <div class="dropdown-header">
                            <p class="dropdown-value">2019</p><span class="arrow-down"></span>
                          </div>
                          <ul>
                            <li value="2019"><span>2019</span></li>
                            <li value="2020"><span>2020</span></li>
                            <li value="2021"><span>2021</span></li>
                          </ul>
                        </li>
                      </ul>
                      <ul class="dropdown-select-small">
                        <li class="dropdown-select-small-narrow">
                          <div class="dropdown-header">
                            <p class="dropdown-value">F</p><span class="arrow-down"></span>
                          </div>
                          <ul>
                            <li value="F"><span>F</span></li>
                            <li value="Sp"><span>Sp</span></li>
                            <li value="Su"><span>Su</span></li>
                          </ul>
                        </li>
                      </ul>
                      <div class="modal-add-course-selected-delete">
                        <img src="/assets/icons8-delete-40.png"></img>
                      </div>
                    </div>
                  </li>
                  <li class="modal-add-course-selected-separator"><hr></hr></li>
                </ul>
              </div>
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
