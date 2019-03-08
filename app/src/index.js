import React from 'react';
import ReactDOM from 'react-dom';
import './style/App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Program from './Program';
import Semester from './Semester';
import PopupCourse from './PopupCourse';
import PopupReqs from './PopupReqs.js';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';

function getCoursesData(){
  return JSON.parse($.ajax({
    type: "GET",
    url: "/course_dir.json",
    async: false
  }).responseText);
}

function getSequenceData(){
  return JSON.parse($.ajax({
    type: "GET",
    url: "/program_sequence.json",
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

// Fetch Data for course info and program sequence respectively
var data = getCoursesData();
var program_sequence = getSequenceData();


// Build React Elements
ReactDOM.render(<Navbar />, document.getElementById('navigation'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<PopupCourse ref={popup => {window.popup = popup;}}/>, document.getElementById('modal-course-container'));
ReactDOM.render(<PopupReqs ref={reqs => {window.reqs = reqs;}} 
   requirements={program_requirements_seng}/>
   , document.getElementById('modal-reqs-container'));
ReactDOM.render(<Program sequence={program_sequence}
  ref={prog => {window.prog = prog;}}
  data={data}
  updateProgramReqs={window.reqs.updateProgramReqList}/>,
    document.getElementById('panel-container-parent'));

// jQuery code
$(function(){

  // Configure draggable course elements for semester container
  var startIndex, changeIndex, uiHeight;
  $(".panel-term-list").sortable({
    'placeholder': 'marker',
    start: function(e, ui){
      console.log("start");
      startIndex = ui.placeholder.index();
      uiHeight = ui.item.outerHeight(true);

      /*ui.item.nextAll("li:not(.marker)").css({
        transform: "translateY("+uiHeight+"px)"
      });
      ui.placeholder.css({
        height: 0,
        padding: 0
      });*/
    },
    change: function(e, ui){
      changeIndex = ui.placeholder.index();
      if(startIndex > changeIndex){
        console.log(1);
        // TODO: Only select slice of current list, not other semesters
        var slice = $("#"+ui.item.parent().attr("id")+" li").slice(changeIndex, $("#"+ui.item.parent().attr("id")+" li").length);
        //console.log(slice);
        slice.not(".ui-sortable-helper").each(function(){
          var item = $(this);
          item.css({
            transform: "translateY("+uiHeight+"px)"
          });
        });
      }else if (startIndex < changeIndex) {
        console.log(2);
        var slice = $("#"+ui.item.parent().attr("id")+' li').slice(startIndex, changeIndex);

        slice.not('.ui-sortable-helper').each(function() {
            var item = $(this);
            item.css({
                transform: 'translateY('+uiHeight+'px)'
            });
        });
      }
      startIndex = changeIndex;
    },
    stop: function(e, ui) {
      $('.ui-sortable-handle').css({
          transform: 'translateY(0)'
      })
    },
    connectWith: ".panel-term-list",
    placeholder: "ui-state-highlight",
    receive: function(event, ui){
      var origin_semester_id = ui.sender.attr("id");
      var new_semester_id = event.target.id;
      var course_str = ui.item.attr("id").replace("_"," ");
      window.prog.moveCourse(course_str, origin_semester_id, new_semester_id);
    }
  });

  $(".panel-course").dblclick(function(){
    var course_obj = data[$(this).attr("id").replace("_"," ")];
    window.popup.populateCourse(course_obj);
    $("#modal-course-details").css("display","block");
  });

  // Configure course details modal properties
  $("#modal-course-content").draggable();

  $("#close-btn").click(function(){
    $("#modal-course-details").css("display","none");
  $("#modal-course-content").css({top: 0, left: 0, position:"relative"});
  });

  $("#modal-course-cancel").click(function(){
    $("#modal-course-details").css("display","none");
  $("#modal-course-content").css({top: 0, left: 0, position:"relative"});
  });

  $(window).click(function(e){
  var target = $(e.target);
    if(target.is("#modal-course-details")){
      console.log("haha");
      $("#modal-course-details").css("display","none");
      $("#modal-course-content").css({top: 0, left: 0, position:"relative"});
    }
  });

  // Configure course reqs modal properties
  $("#navbar-course-icon").click(function(){
    $("#modal-reqs").css("display","block");
  });

  $(window).click(function(e){
  var target = $(e.target);
    if(target.is("#modal-reqs")){
      $("#modal-reqs").css("display","none");
    }
  });

  // Dropdown select value
  $("ul.dropdown-select li ul li").click(function(e){
    var selected_value = $(this).attr("value");
    var selected_display = $(this).parent().parent().children(".dropdown-header").children("p.dropdown-value");
    selected_display.attr("value", selected_value);
    selected_display.text(selected_value);
  });
});
