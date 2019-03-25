import $ from 'jquery';

class Modal {
  static configureGeneralModal(){
    $(".modal-draggable").draggable({handle: ".modal-draggable-handle"});

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

  static configureCourseModal(data, modal){
      $(document).on("dblclick", ".course", function(){
        var course_obj = data[$(this).attr("id").replace("_"," ")];
        modal.actionPopulateCourse(course_obj);
        $("#modal-course-details").css("display","block");
      });
  }

  static configureAddCourseModal(){
    // Configure Add Course modal actions and properties
    $("#add-course").click(function(){
      $("#modal-add-course").css("display","block");
    });
  }

  static configureReqModal(){
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

  static configureSettingsModal(){
    $("#navbar-settings-icon").click(function(){
      $("#modal-settings-details").css("display","block");
    });
  }
}

export default Modal;
