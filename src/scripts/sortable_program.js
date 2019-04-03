import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';

class SortableProgram {
  static configureCourseContextMenu(program){
    $(document).on("mouseenter", ".course-details-icon", function(){
      $(this).find("img").css({"visibility":"visible", "opacity":"1"});
    });

    $(document).on("mouseleave", ".course-details-icon", function(){
      $(this).find("img").css({"visibility":"hidden", "opacity":"0"});
    });

    $(document).on("mouseenter", ".course-context-menu ul li", function(){
      $(this).css({"background":"#666"});
    });

    $(document).on("mouseleave", ".course-context-menu ul li", function(){
      $(this).css({"background":"#353535"});
    });

    $(document).on("click", ".course-details-icon", function(){
      $(this).next().find("ul").css({"visibility":"visible", "opacity":"1"});
    });

    $(window).click(function(e){
      if(!$(e.target).is(".course-context-menu ul li") &&
         !$(e.target).is(".course-context-menu ul li span") &&
         !$(e.target).is(".course-details-icon img")){
        $(".course-context-menu ul ").css({"visibility":"hidden", "opacity":"0"});
      }
    });

    $(document).on("click", ".context-delete", function(){
      var course_str = $(this).parents().eq(3).attr("id").replace("_"," ");
      var semester_id = $(this).parents().eq(4).attr("id");
      program.actionRemoveCourse(semester_id, course_str);
      $(this).parent().css({"visibility":"hidden", "opacity":"0"});
    });
  }

  static configureSortable(program){
    // Configure draggable course elements for semester container
    var startIndex, changeIndex, uiHeight;
    $(".panel-term-list").sortable({
      'placeholder': 'marker',
      start: function(e, ui){
        // BUG: First time element is selected, reduces size, but all subsequenc selects actions have no effect
        startIndex = ui.placeholder.index();
        uiHeight = ui.item.outerHeight(true);

        // Moves all next elements down by uiHeight px
        /*ui.item.nextAll("li:not(.marker)").css({
          transform: "translateY("+uiHeight+"px)"
        });*/
        // Moves all next elements up one iteration of uiHeight px
        /*ui.placeholder.css({
          height: 0,
          padding: 0
        });*/
      },
      change: function(e, ui){
        //console.log("change");

        // The index at which the placeholder of the element is located.
        // BUG: When moving element up, causes placeholder to be shifted 1 more up than it's supposed to be
        changeIndex = ui.placeholder.index();
        //console.log("Placeholder: "+changeIndex);

        // BUG: When moving element down, no smooth transition at all, all blocky, unless moved up first
        if(startIndex > changeIndex){
          changeIndex = changeIndex + 1;
          //console.log("up");
          var slice = $("#"+ui.item.parent().attr("id")+" li").slice(changeIndex, $("#"+ui.item.parent().attr("id")+" li").length);
          //console.log("LENGT: "+slice.length);
          /*slice.not(".ui-sortable-helper").each(function(){
            var item = $(this);
            item.css({
              transform: "translateY("+uiHeight+"px)"
            });
          });*/
        }else if (startIndex < changeIndex) {
          //console.log("down");
          var slice = $("#"+ui.item.parent().attr("id")+" li").slice(startIndex, changeIndex);
          //console.log("LENGT: "+slice.length);
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
        program.actionMoveCourse(course_str, origin_semester_id, new_semester_id);
      }
    });
  }
}

export default SortableProgram;
