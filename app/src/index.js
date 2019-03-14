import React from 'react';
import ReactDOM from 'react-dom';
import './style/App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Program from './Program';
import PopupAddCourse from './PopupAddCourse.js';
import PopupCourse from './PopupCourse';
import PopupReqs from './PopupReqs.js';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import SortableProgram from './scripts/SortableProgram.js';
import ModalCourse from './scripts/ModalCourse.js';
import Dropdown from './scripts/Dropdown.js';
import AddCourse from './scripts/AddCourse.js';
import AddSemester from './scripts/AddSemester.js';

function getCoursesData(){
  return JSON.parse($.ajax({
    type: "GET",
    url: "/data/course_dir.json",
    async: false
  }).responseText);
}

function getSequenceData(){
  return JSON.parse($.ajax({
    type: "GET",
    url: "/data/program_sequence.json",
    async: false
  }).responseText);
}

function getSelectionData(){
  return JSON.parse($.ajax({
    type: "GET",
    url: "/data/program_selection.json",
    async: false
  }).responseText);
}

function getRequirementsData(){
  return JSON.parse($.ajax({
    type: "GET",
    url: "/data/requirements_dir.json",
    async: false
  }).responseText);
}

var program_requirements_seng = [
  ["CSC 111"],
  ["CSC 115","CSC 116"],
  ["ENGR 110",["ENGR 112","ENGL 135"]],
  ["ENGR 120"],
  ["ENGR 130"],
  ["ENGR 141"],
  ["MATH 100"],
  ["MATH 101"],
  ["MATH 110"],
  ["PHYS 110"],
  ["PHYS 111"],
  ["CSC 230"],
  ["CHEM 101"],
  ["CSC 225"],
  ["ECE 260"],
  ["ECE 310"],
  ["ECON 180"],
  ["MATH 122"]
]

var sequence_ids = [
  "1A",
  "1B",
  "1C",
  "2A",
  "2B",
  "2C",
  "3A",
  "3B",
  "3C",
  "4A",
  "4B",
  "4C",
  "5A",
  "5B",
  "5C",
  "6A",
  "6B",
  "6C",
  "7A",
  "7B",
  "7C"
];

// Fetch Data for course info and program sequence respectively
var data = getCoursesData();
var program_sequence = getSequenceData();
var program_selection = getSelectionData();
var program_requirements = getRequirementsData();

// Build React Elements
ReactDOM.render(<Navbar />, document.getElementById('navigation'));
ReactDOM.render(<Sidebar selection={program_selection} ref={sidebar => {window.sidebar = sidebar}}/>, document.getElementById('sidebar'));
ReactDOM.render(<PopupCourse ref={popupCourse => {window.popupCourse = popupCourse;}}/>, document.getElementById('modal-course-container'));
ReactDOM.render(<PopupReqs ref={popupReqs => {window.popupReqs = popupReqs;}}
   requirements={program_requirements_seng}/>,
document.getElementById('modal-reqs-container'));

ReactDOM.render(<Program sequence={program_sequence}
  ref={program => {window.program = program;}}
  data={data}
  sequence_ids={sequence_ids}
  updateProgramReqs={window.popupReqs.updateProgramReqList}/>,
document.getElementById('panel-container-parent'));

ReactDOM.render(<PopupAddCourse data={data}
  ref={popupAddCourse => {window.popupAddCourse = popupAddCourse}}
  addCourse={window.program.addCourse}
  updateProgramReqs={window.popupReqs.updateProgramReqList}/>,
document.getElementById('modal-add-course-container'));

// jQuery code
$(function(){
  SortableProgram.render(window.program);

  ModalCourse.configureCourseModal(data, window.popupCourse);
  ModalCourse.configureGeneralModal();
  ModalCourse.configurePageModalComponents();

  Dropdown.configureDropdownActions();
  Dropdown.configureDropdownSelection(window.sidebar);

  AddCourse.configureModalAnimations(window.popupAddCourse);
  AddCourse.configureStagingActions(window.popupAddCourse);
  AddCourse.configureSubmitActions(window.popupAddCourse, window.popupReqs);

  AddSemester.configureAddSemesterAction(window.program, SortableProgram);
});
