import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';

import './style/App.css';

import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import Program from './components/Program.js';
import AddCourse from './components/Modal/AddCourse.js';
import Course from './components/Modal/Course';
import Requirements from './components/Requirements.js';
import Settings from './components/Settings.js';
import Notification from './components/Notification.js';

import ScriptSortableProgram from './scripts/sortable_program.js';
import ScriptModal from './scripts/modal.js';
import ScriptDropdown from './scripts/dropdown.js';
import ScriptAddCourse from './scripts/add_course.js';
import ScriptAddSemester from './scripts/add_semester.js';
import ScriptData from './scripts/data.js';
import ScriptColors from './scripts/colors.js';

// Fetch Data for course info and program sequence respectively
var data = ScriptData.getCoursesData();
var program_sequence = ScriptData.getSequenceData();
var program_selection = ScriptData.getSelectionData();
var sequence_ids = ScriptData.getSemesterSequenceIds();
var program_requirements = ScriptData.getRequirementsData();
var requirements = ScriptData.getRequirementsDataNew();

// Create global variable indicating color theme choice
window.colorTheme = "dark";

// Build React Elements
ReactDOM.render(<Navbar
  colors={ScriptColors}/>,
document.getElementById('navigation'));

ReactDOM.render(<Course
  ref={modalCourse => {window.modalCourse = modalCourse;}}
  colors={ScriptColors}/>,
document.getElementById('modal-course-container'));

ReactDOM.render(<Requirements
  ref={requirements => {window.requirements = requirements;}}
  requirements={requirements}
  colors={ScriptColors}/>,
document.getElementById('modal-reqs-container'));

ReactDOM.render(<Sidebar
  ref={sidebar => {window.sidebar = sidebar}}
  selection={program_selection}
  colors={ScriptColors}
  setProgramRequirements={window.requirements.actionSetProgramRequirements}/>,
document.getElementById('sidebar'));

ReactDOM.render(<Program sequence={program_sequence}
  ref={program => {window.program = program;}}
  data={data}
  sequence_ids={sequence_ids}
  updateProgramRequirements={window.requirements.actionUpdateProgramRequirements}
  colors={ScriptColors}/>,
document.getElementById('panel-container-parent'));

ReactDOM.render(<AddCourse data={data}
  ref={modalAddCourse => {window.modalAddCourse = modalAddCourse}}
  addCourse={window.program.actionAddCourse}
  convertYearAndSemesterToProgramSemesterId={window.program.convertYearAndSemesterToProgramSemesterId}
  getCurrentAvailableYears={window.program.getCurrentAvailableYears}
  colors={ScriptColors}/>,
document.getElementById('modal-add-course-container'));

ReactDOM.render(<Settings/>, document.getElementById('modal-settings-container'));

ReactDOM.render(<Notification/>, document.getElementById("notification-container"));

// jQuery code
$(function(){
  // Configure dynamic actions for website
  ScriptSortableProgram.render(window.program);
  ScriptSortableProgram.configureCourseContextMenu(window.program);

  ScriptModal.configureCourseModal(data, window.modalCourse);
  ScriptModal.configureGeneralModal();
  ScriptModal.configureAddCourseModal();
  ScriptModal.configureReqModal();
  ScriptModal.configureSettingsModal();

  ScriptDropdown.configureDropdownActions();
  ScriptDropdown.configureDropdownSelection(window.sidebar, window.modalAddCourse);
  ScriptDropdown.configureSidebarSubmitSelection(window.sidebar);

  ScriptAddCourse.configureModalAnimations(window.modalAddCourse);
  ScriptAddCourse.configureStagingActions(window.modalAddCourse);
  ScriptAddCourse.configureSubmitActions(window.modalAddCourse, window.requirements);

  ScriptAddSemester.configureAddSemesterAction(window.program, ScriptSortableProgram);

  ScriptColors.configureLightAndDarkThemes();
});
