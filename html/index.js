/* Script to program page behavior, and add event listeners */

$(function(){
  $(".panel-term-list").sortable({
    connectWith: ".panel-term-list",
    placeholder: "ui-state-highlight",
    receive: function(event, ui){
      var origin_semester_id = ui.sender.attr("id");
      var new_semester_id = event.target.id;
      var course_str = ui.item.attr("id").replace("_"," ");
      //console.log(origin_semester_id+"->"+new_semester_id+" "+course_str);
      program.moveCourse(course_str, origin_semester_id, new_semester_id);
    }
  }).disableSelection();
});
