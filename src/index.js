import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import './style/App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.js';
import Sidebar from './components/Sidebar.js';
import Program from './components/Program.js';
import AddCourse from './components/Modal/AddCourse.js';
import CourseDetails from './components/Modal/CourseDetails';
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
import ScriptNotification from './scripts/notification.js';
import ScriptSidebar from './scripts/sidebar.js';

// Fetch all relevant data, including courses, sequence, selection, semester IDs,
// and program requirements
var data = ScriptData.getCoursesData();
var program_sequence = ScriptData.getSequenceData();
var program_selection = ScriptData.getSelectionData();
var sequence_ids = ScriptData.getSemesterSequenceIds();
var requirements = ScriptData.getRequirementsData();

// Create global variable indicating color theme choice
window.colorTheme = "dark";

// Create React elements for web app
ReactDOM.render(<Notification
  ref={notification => {window.notification = notification}}/>,
  document.getElementById("notification-container"));

ReactDOM.render(<Navbar
  colors={ScriptColors}/>,
  document.getElementById('navigation'));

ReactDOM.render(<CourseDetails
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

ReactDOM.render(<Program
  sequence={program_sequence}
  ref={program => {window.program = program;}}
  data={data}
  sequence_ids={sequence_ids}
  updateProgramRequirements={window.requirements.actionUpdateProgramRequirements}
  throwNewNotification={window.notification.throwNewNotification}
  colors={ScriptColors}/>,
  document.getElementById('panel-container-parent'));

ReactDOM.render(<AddCourse
  data={data}
  ref={modalAddCourse => {window.modalAddCourse = modalAddCourse}}
  addCourse={window.program.actionAddCourse}
  convertYearAndSemesterToProgramSemesterId={window.program.convertYearAndSemesterToProgramSemesterId}
  getCurrentAvailableYears={window.program.getCurrentAvailableYears}
  colors={ScriptColors}/>,
  document.getElementById('modal-add-course-container'));

ReactDOM.render(<Settings/>,
  document.getElementById('modal-settings-container'));

// jQuery helps configure dynamic behavior of webpage by configuring all
// dynamic components with imported static classes
$(function(){

  // Configure sortable and draggable properties of courses & context menu
  ScriptSortableProgram.configureSortable(window.program);
  ScriptSortableProgram.configureCourseContextMenu(window.program);

  // Configure dynamic Modal behavior, and subsequent behavior relating to
  // individual modal elements
  ScriptModal.configureModal();
  ScriptModal.configureCourseDetailsModal(data, window.modalCourse);
  ScriptModal.configureAddCourseModal();
  ScriptModal.configureRequirementsModal();
  ScriptModal.configureSettingsModal();

  // Configure dropdown menu events, such as selection, and additional
  // behavior for sidebar selection
  ScriptDropdown.configureDropdownActions();
  ScriptDropdown.configureDropdownSelection(window.sidebar, window.modalAddCourse);
  ScriptDropdown.configureSidebarSubmitSelection(window.sidebar);

  // Configure modal events and animations, and additional Add Coruse modal
  // events
  ScriptAddCourse.configureModalAnimations(window.modalAddCourse);
  ScriptAddCourse.configureStagingActions(window.modalAddCourse);
  ScriptAddCourse.configureSubmitActions(window.modalAddCourse, window.requirements);

  // Configure action of adding semester to program
  ScriptAddSemester.configureAddSemesterAction(window.program, ScriptSortableProgram);

  // Configure dynamic behavior for switching between light and dark theme
  ScriptColors.configureLightAndDarkThemes();

  // Configure dynamic behavior of notification bar
  ScriptNotification.configureNotificationBarToggle();

  // Configure sidebar view switching animation
  ScriptSidebar.configureSwitchView();
});
