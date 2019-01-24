$(function(){
  $("#term_1, #term_2, #term_3, #term_4, #term_5").sortable({
    connectWith: ".panel-term-list"
  }).disableSelection();
});
