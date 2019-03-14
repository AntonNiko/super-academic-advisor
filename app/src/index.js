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
  SortableProgram.render();

  ModalCourse.ConfigureCourseModal(data, window.popupCourse);
  ModalCourse.ConfigureGeneralModal();
  ModalCourse.ConfigurePageModalComponents();


  // Dropdown select hover action
  // TODO: https://stackoverflow.com/questions/6658752/click-event-doesnt-work-on-dynamically-generated-elements
  // Adapt for dynamically generated elements
  Dropdown.configureDropdownActions();

  // Dropdown select value
  $(document).on("click", "ul.dropdown-select li ul li, ul.dropdown-select-small li ul li", function(){
    var selected_value = $(this).attr("value");
    var selected_display = $(this).parent().parent().children(".dropdown-header").children("p.dropdown-value");
    selected_display.attr("value", selected_value);
    selected_display.text(selected_value);
    $(this).parent().css({"visibility":"hidden", "opacity":"0"});

    switch($(this).parent().parent().attr("id")){
      case "faculty-dropdown":
        window.sidebar.selectFaculty(selected_value);
        break;
      case "program-dropdown":
        window.sidebar.selectProgram(selected_value);
        break;
      case "minor-dropdown":
        window.sidebar.selectMinor(selected_value);
        break;
      case "specialization-dropdown":
        window.sidebar.selectSpecialization(selected_value);
        break;
      default:
        break;
    }
  });

  // Modal add course table toggle animation
  $(".modal-add-course-subject").on("click", function(){
    $(this).next().slideToggle(200);
    $(this).find(".modal-chevron-collapsed").toggleClass("modal-chevron-expanded");
  });

  // Modal add course table select action
  $(".modal-course-item").on("click", function(){
    var course_str = $(this).find("span").text();
    if($(this).hasClass("course-item-selected")){
      window.popupAddCourse.unselectUnstagedCourse(course_str);
    }else{
      window.popupAddCourse.selectUnstagedCourse(course_str);
    }
  })

  $(document).on("click", ".modal-add-course-selected-course", function(){
    var course_str = $(this).find(".modal-add-course-selected-title span").text();

    if($(this).hasClass("course-item-selected")){
      window.popupAddCourse.unselectStagedCourse(course_str);
    }else{
      window.popupAddCourse.selectStagedCourse(course_str);
    }
  });

  $("#modal-add-course-action-add").on("click", function(){
    window.popupAddCourse.stageCourses();
  });
  $("#modal-add-course-action-remove").on("click", function(){
    window.popupAddCourse.unstageCourses();
  });

  // Modal add course submit courses to program action
  $("#modal-add-course-submit").click(function(){
    window.popupAddCourse.submitCourses();
    window.popupReqs.forceUpdate();
  });

  // Add semester action
  $("#add-semester-button").click(function(){
    window.program.addSemester();

    SortableProgram.render();
  });
});
