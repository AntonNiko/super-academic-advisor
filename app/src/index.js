import React from 'react';
import ReactDOM from 'react-dom';
import './style/App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Program from './Program';
import ModalAddCourse from './ModalAddCourse.js';
import ModalCourse from './ModalCourse';
import Requirements from './Requirements.js';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import SortableProgram from './scripts/sortable_program.js';
import Modal from './scripts/modal.js';
import Dropdown from './scripts/dropdown.js';
import AddCourse from './scripts/add_course.js';
import AddSemester from './scripts/add_semester.js';
import Data from './scripts/data.js';
import Colors from './scripts/colors.js';

// Fetch Data for course info and program sequence respectively
var data = Data.getCoursesData();
var program_sequence = Data.getSequenceData();
var program_selection = Data.getSelectionData();
var sequence_ids = Data.getSemesterSequenceIds();
var program_requirements_seng = Data.getRequirementsData();

// Create global variable indicating color theme choice
window.colorTheme = "dark";

// Build React Elements
ReactDOM.render(<Navbar 
  colors={Colors}/>,
document.getElementById('navigation'));

ReactDOM.render(<Sidebar
  ref={sidebar => {window.sidebar = sidebar}}
  selection={program_selection}
  colors={Colors}/>,
document.getElementById('sidebar'));

ReactDOM.render(<ModalCourse 
  ref={modalCourse => {window.modalCourse = modalCourse;}}
  colors={Colors}/>, 
document.getElementById('modal-course-container'));

ReactDOM.render(<Requirements
  ref={requirements => {window.requirements = requirements;}}
  requirements={program_requirements_seng}
  colors={Colors}/>,
document.getElementById('modal-reqs-container'));

ReactDOM.render(<Program sequence={program_sequence}
  ref={program => {window.program = program;}}
  data={data}
  sequence_ids={sequence_ids}
  updateProgramReqs={window.requirements.actionUpdateProgramReqs}
  colors={Colors}/>,
document.getElementById('panel-container-parent'));

ReactDOM.render(<ModalAddCourse data={data}
  ref={modalAddCourse => {window.modalAddCourse = modalAddCourse}}
  addCourse={window.program.actionAddCourse}
  convertYearAndSemesterToProgramSemesterId={window.program.convertYearAndSemesterToProgramSemesterId}
  getCurrentAvailableYears={window.program.getCurrentAvailableYears}
  colors={Colors}/>,
document.getElementById('modal-add-course-container'));

// jQuery code
$(function(){
  SortableProgram.render(window.program);
  SortableProgram.configureCourseContextMenu(window.program);

  Modal.configureCourseModal(data, window.modalCourse);
  Modal.configureGeneralModal();
  Modal.configureAddCourseModal();
  Modal.configureReqModal();

  Dropdown.configureDropdownActions();
  Dropdown.configureDropdownSelection(window.sidebar, window.modalAddCourse);

  AddCourse.configureModalAnimations(window.modalAddCourse);
  AddCourse.configureStagingActions(window.modalAddCourse);
  AddCourse.configureSubmitActions(window.modalAddCourse, window.requirements);

  AddSemester.configureAddSemesterAction(window.program, SortableProgram);

  Colors.configureLightAndDarkThemes();
});
