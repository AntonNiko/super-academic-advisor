import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Test from './Test';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Program from './Program';
import Semester from './Semester';
import PopupCourse from './PopupCourse';
import * as serviceWorker from './serviceWorker';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';

var program_sequence_seng_rec = {
    "1A":[["CSC 111","ENGR 130","ENGR 110","MATH 100","MATH 110","PHYS 110"],2018,"F"],
    "1B":[["CSC 115","ENGR 120","MATH 101","ENGR 141","PHYS 111"],2019,"Sp"],
    "1C":[[],2019,"Su"],
    "2A":[["MATH 122"],2019,"F"],
    "2B":[[],2020,"Sp"],
    "2C":[[],2020,"Su"]
  }

var data = {
  "CHEM 101":["CHEM","101",1.5,["F","Su"],[],[]],
  "CSC 111":["CSC","111",1.5,["F","Sp"],[],[]],
  "CSC 115":["CSC","115",1.5,["F","Sp","Su"],[[["CSC 110","p"],["CSC 111","p"]]],[]],
  "CSC 116":["CSC","116",1.5,["F"],[[["CSC 110","p"],["CSC 111","p"]]],[]],
  "CSC 225":["CSC","225",1.5,["F","Sp","Su"],[[["CSC 115","p"],["CSC 116","p"]],[["MATH 122","p"]]],[]],
  "CSC 226":["CSC","226",1.5,["F","Sp","Su"],[[["CSC 225","p"]]],[]],
  "CSC 230":["CSC","230",1.5,["F","Sp","Su"],[[["CSC 115","p"],["CSC 116","p"]]],[]],
  "CSC 320":["CSC","320",1.5,["F","Sp","Su"],[[["CSC 226","p"]]],[]],
  "CSC 355":["CSC","355",1.5,["Sp"],[[["CSC 230","p"],["ECE 255","p"]],[["MATH 122","p"]]],[]],
  "CSC 360":["CSC","360",1.5,["F","Sp","Su"],[[["SENG 265","p"]],[["CSC 230","p"],["ECE 255","p"]],[["CSC 226","c"]]],[]],
  "CSC 361":["CSC","361",1.5,["F","Sp"],[[["SENG 265","p"]],[["CSC 230","p"],["ECE 255","p"]],["CSC 226","c"]],[]],
  "CSC 370":["CSC","370",1.5,["F","Sp","Su"],[[["CSC 226","p"]],[["SENG 265","p"]]],[]],
  "ECE 255":["ECE","255",1.5,["F"],[[["CSC 111","p"]]],[]],
  "ECE 260":["ECE","260",1.5,["F","Su"],[[["MATH 101","p"]], [["MATH 110","p"],["MATH 211","c"]]],[]],
  "ECE 355":["ECE","355",1.5,["F"],[[["ECE 241","p"],["MATH 122","p"]],[["ECE 255","p"],["CSC 230","p"]]],[]],
  "ECE 360":["ECE","360",1.5,["F","Sp"],[[["ECE 360","p"]]],[]],
  "ECE 458":["ECE","458",1.5,["Sp"],[[["ECE 255","p"],["CSC 230","p"]]],[]],
  "ECON 180":["ECON","180",1.5,["F","Su"],[[["MATH 101","p"]]],[]],
  "ENGL 135":["ENGL","135",1.5,["F","Sp","Su"],[],[]],
  "ENGR 110":["ENGR","110",2.5,["F"],[],[]],
  "ENGR 112":["ENGR","112",1.0,["F"],[[["ENGL 135","p"]]],[]],
  "ENGR 120":["ENGR","120",2.5,["Sp"],[[["CSC 110","p"],["CSC 111","c"]], [["ENGR 110","p"],[["ENGR 112","ENGL 135"],"p"]]],[]],
  "ENGR 121":["ENGR","121",1.0,["Sp"],[[["ENGR 110","p"],[["ENGR 112","ENGL 135"],"p"]], [["ENGR 240","p"],["ENGL 225","p"]], [["CSC 110","p"],["CSC 111","c"]]],[]],
  "ENGR 130":["ENGR","130",0.5,["F","Sp"],[],[]],
  "ENGR 141":["ENGR","141",1.5,["Sp","Su"],[[["MATH 100","p"],["MATH 109","p"]],[["MATH 110","c"],["MATH 211","c"]]],[]],
  "ENGR 240":["ENGR","240",1.5,["F","Sp"],[[["ENGR 110","p"],["ENGL 135","p"],["ENGL 146","p"],["ENGL 147","p"]]],[]],
  "MATH 100":["MATH","100",1.5,["F","Sp","Su"],[],[]],
  "MATH 101":["MATH","101",1.5,["F","Sp","Su"],[[["MATH 100","p"],["MATH 109","p"]]],[]],
  "MATH 109":["MATH","109",1.5,["F","Sp","Su"],[],[]],
  "MATH 110":["MATH","110",1.5,["F"],[],[]],
  "MATH 122":["MATH","122",1.5,["F","Sp","Su"],[[["MATH 100","p"],["MATH 102","p"],["MATH 109","p"],["MATH 151","p"]]],[]],
  "PHYS 110":["PHYS","110",1.5,["F","Sp"],[],[]],
  "PHYS 111":["PHYS","111",1.5,["Sp","Su"],[[["MATH 100","c"],["MATH 109","c"]],[["PHYS 110","p"]]],[]],
  "SENG 265":["SENG","265",1.5,["F","Sp","Su"],[[["CSC 115","p"],["CSC 116","p"]]],[]],
  "SENG 275":["SENG","275",1.5,["Su"],[[["SENG 265","p"]]],[]],
  "SENG 310":["SENG","310",1.5,["Sp","Su"],[[["SENG 265","p"],["ECE 241","p"]]],[]],
  "SENG 321":["SENG","321",1.5,["F","Sp"],[[["SENG 265","p"]]],[]],
  "SENG 350":["SENG","350",1.5,["F"],[[["SENG 275","p"]]],[]],
  "SENG 360":["SENG","360",1.5,["F"],[[["SENG 265","p"]]],[]],
  "SENG 371":["SENG","371",1.5,["Sp"],[[["SENG 275","p"],["SENG 321","p"]]],[]],
  "STAT 254":["STAT","254",1.5,["F"],[[["MATH 200","c"]]],[]],
  "STAT 260":["STAT","260",1.5,["F","Sp","Su"],[[["MATH 101","p"],["MATH 208","p"]]],[]]
};


ReactDOM.render(<Navbar />, document.getElementById('navigation'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<Program sequence={program_sequence_seng_rec}
  ref={prog => {window.prog = prog;}}
  data={data}/>,
  document.getElementById('panel-container-parent'));
ReactDOM.render(<PopupCourse ref={popup => {window.popup = popup;}} />, document.getElementById('modal-container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

$(function(){
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
      //console.log("CHANGE");
      //console.log(startIndex+" | "+changeIndex);

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
      //console.log("STOP");
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


  $("#modal-content").draggable();

  $(".panel-course").dblclick(function(){
    var course_obj = data[$(this).attr("id").replace("_"," ")];
    window.popup.populateCourse(course_obj);
    $("#modal").css("display","block");
  });

  $("#close-btn").click(function(){
    $("#modal").css("display","none");
  $("#modal-content").css({top: 0, left: 0, position:"relative"});
  });

  $("#modal-course-cancel").click(function(){
    $("#modal").css("display","none");
  $("#modal-content").css({top: 0, left: 0, position:"relative"});
  });

  $(window).click(function(e){
  var target = $(e.target);
    if(target.is("#modal")){
      $("#modal").css("display","none");
      $("#modal-content").css({top: 0, left: 0, position:"relative"});
    }
  });


  // Dropdown select value 
  $("ul.dropdown-select li ul li").click(function(e){
    var selected_value = $(this).attr("value");
    var selected_display = $(this).parent().parent().children("span.dropdown-value");
    selected_display.attr("value", selected_value);
    selected_display.text(selected_value);
  });
});
/*
React Components:
- Navbar
- Sidebar
- Program container
- Semester containers
- Course containers
- Pop-up modal
All visual
*/
