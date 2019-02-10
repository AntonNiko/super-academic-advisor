/* Script to program page behavior, and add event listeners */

$(function(){
  $(".panel-term-list").sortable({
    connectWith: ".panel-term-list"
  }).disableSelection();
});
