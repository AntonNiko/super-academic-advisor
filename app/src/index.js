import React from 'react';
import ReactDOM from 'react-dom';
import './style/App.css';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Program from './Program';
import Semester from './Semester';
import PopupAddCourse from './PopupAddCourse.js';
import PopupCourse from './PopupCourse';
import PopupReqs from './PopupReqs.js';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';

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

// Fetch Data for course info and program sequence respectively
var data = getCoursesData();
var program_sequence = getSequenceData();
var program_selection = getSelectionData();
var program_requirements = getRequirementsData();


// Build React Elements
ReactDOM.render(<Navbar />, document.getElementById('navigation'));
ReactDOM.render(<Sidebar selection={program_selection}/>, document.getElementById('sidebar'));
ReactDOM.render(<PopupCourse ref={popup => {window.popup = popup;}}/>, document.getElementById('modal-course-container'));
ReactDOM.render(<PopupReqs ref={reqs => {window.reqs = reqs;}}
   requirements={program_requirements_seng}/>
   , document.getElementById('modal-reqs-container'));
ReactDOM.render(<Program sequence={program_sequence}
  ref={prog => {window.prog = prog;}}
  data={data}
  updateProgramReqs={window.reqs.updateProgramReqList}/>,
    document.getElementById('panel-container-parent'));

ReactDOM.render(<PopupAddCourse />, document.getElementById('modal-add-course-container'));

// jQuery code
$(function(){

  // Configure draggable course elements for semester container
  var startIndex, changeIndex, uiHeight;
  $(".panel-term-list").sortable({
    'placeholder': 'marker',
    start: function(e, ui){
      startIndex = ui.placeholder.index();
      uiHeight = ui.item.outerHeight(true);

      ui.item.nextAll("li:not(.marker)").css({
        transform: "translateY("+uiHeight+"px)"
      });
      ui.placeholder.css({
        height: 0,
        padding: 0
      });
    },
    change: function(e, ui){
      changeIndex = ui.placeholder.index();
      if(startIndex > changeIndex){
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
        var slice = $("#"+ui.item.parent().attr("id")+' li').slice(startIndex, changeIndex);

        slice.not('.ui-sortable-helper').each(function() {
            var item = $(this);
            item.css({
                transform: 'translateY(0px)'
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

  // Configure course details modal to open on double click
  $(".panel-course").dblclick(function(){
    var course_obj = data[$(this).attr("id").replace("_"," ")];
    window.popup.populateCourse(course_obj);
    $("#modal-course-details").css("display","block");
  });

  $(".modal-draggable").draggable();

  $(".modal-cancel-button").click(function(){
    $(this).parents().eq(4).css({"display":"none"});
    $(this).parents().eq(3).css({top: 0, left: 0, position:"relative"});
  });

  $(".modal-close-button").click(function(){
    $(this).parents().eq(1).css({"display":"none"});
    $(this).parent().css({top: 0, left: 0, position:"relative"});
  });

  $(window).click(function(e){
  var target = $(e.target);
    if(target.is(".modal")){
      target.css("display","none");
      target.find(".modal-content").css({top: 0, left: 0, position:"relative"})
    }
  });

  // Configure Add Course modal actions and properties
  $("#add-course").click(function(){
    $("#modal-add-course").css("display","block");
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

  // Dropdown select hover action
  $("ul.dropdown-select li").mouseenter(function(){
    $(this).find("ul").css({"visibility":"visible", "opacity":"1"});
  });
  $("ul.dropdown-select li").mouseleave(function(){
    $(this).find("ul").css({"visibility":"hidden", "opacity":"0"});
  });

  $("ul.dropdown-select li ul li").hover(
    function(){
      $(this).css({"background":"#666"});
    },
    function(){
      $(this).css({"background":"#353535"});
    }
  );

  // Dropdown select value
  $("ul.dropdown-select li ul li").click(function(e){
    var selected_value = $(this).attr("value");
    var selected_display = $(this).parent().parent().children(".dropdown-header").children("p.dropdown-value");
    selected_display.attr("value", selected_value);
    selected_display.text(selected_value);
    $(this).parent().css({"visibility":"hidden", "opacity":"0"})
  });


  // Modal add course table toggle animation
  $(".modal-add-course-subject").click(function(){
    $(this).next().slideToggle(200);
    $(this).find(".modal-chevron-collapsed").toggleClass("modal-chevron-expanded");
  });

  // Modal add course table select action
  $(".modal-course-item").click(function(){
    console.log("1");

    // Send selected course to PopupAddCourse
    $(this).css({"background-color":"#3e3e3e"});
  })
});
