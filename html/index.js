/* Script to program page behavior, and add event listeners */
$(function(){
  $(".panel-term-list").sortable({
    connectWith: ".panel-term-list"
  }).disableSelection();

  $(".panel-course").mouseup(function(){
    // Analyze that new course placement satisfies credit load, offered semesters, requisites

    // TODO: Fetch course_str and semester_id
    var course_str = $(this).attr("id").replace("_"," ");
    //console.log($(this).parent().attr("id"));

    $(".panel-term-list").droppable({
      drop: function(event, ui){
        console.log($(this).attr("id"));
      }
    });
  });
});
