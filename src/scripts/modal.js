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
        var course_str = $(this).attr("id").replace("_"," ");
        modal.actionPopulateCourse(Modal.getCourseObjectByString(data, course_str));
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

  static getCourseObjectByString(data, course_str) {
    for (var i=0; i<data.length; i++) {
      if (data[i]["course_str"] == course_str) {
        return data[i];
      }
    }
  }
}

export default Modal;
