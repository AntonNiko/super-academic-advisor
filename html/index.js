/* Script to program page behavior, and add event listeners */

$(function(){
  $(".panel-term-list").sortable({
    connectWith: ".panel-term-list",
    receive: function(event, ui){
      var semester_id = event.target.id;
      var course_str = ui.item.attr("id").replace("_"," ");
      console.log(semester_id+" "+course_str);
    }
  }).disableSelection();
});
