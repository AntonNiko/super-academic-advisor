import $ from 'jquery';

class ModalCourse {
  static configureCourseModal(data, modal){
      $(".panel-course").dblclick(function(){
        var course_obj = data[$(this).attr("id").replace("_"," ")];
        modal.populateCourse(course_obj);
        $("#modal-course-details").css("display","block");
      });
  }

  static configureGeneralModal(){
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
  }

  static configurePageModalComponents(){
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
  }
}

export default ModalCourse;
