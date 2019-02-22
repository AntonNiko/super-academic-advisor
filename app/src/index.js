import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Test from './Test';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Program from './Program';
import Semester from './Semester';
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

ReactDOM.render(<Navbar />, document.getElementById('navigation'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<Program program_sequence={program_sequence_seng_rec} ref={prog => {window.prog = prog;}}/>, document.getElementById('panel-container-parent'));

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
      console.log(startIndex);

      console.log("INITIAL");
      console.log();
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
      console.log("CHANGE");
      console.log(startIndex+" | "+changeIndex);

      if(startIndex > changeIndex){
        // TODO: Only select slice of current list, not other semesters
        var slice = $("#"+ui.item.parent().attr("id")+" li").slice(changeIndex, $("#"+ui.item.parent().attr("id")+" li").length);
        console.log(slice);
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
      console.log("STOP");
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
      console.log(origin_semester_id+" | "+new_semester_id+" | "+course_str);
      window.prog.moveCourse(course_str, origin_semester_id, new_semester_id);
    }
  });


  $("#modal-content").draggable();

  $(".panel-course").click(function(){
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
