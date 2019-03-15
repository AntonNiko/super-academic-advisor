import $ from 'jquery';

class AddCourse {
    static configureModalAnimations(popupAddCourse){
        // Modal add course table toggle animation
        $(".modal-add-course-subject").on("click", function(){
            $(this).next().slideToggle(200);
            $(this).find(".modal-chevron-collapsed").toggleClass("modal-chevron-expanded");
        });

        // Modal add course table select action
        $(".modal-course-item").on("click", function(){
            var course_str = $(this).find("span").text();
            if($(this).hasClass("course-item-selected")){
            popupAddCourse.actionUnselectUnstagedCourse(course_str);
            }else{
            popupAddCourse.actionSelectUnstagedCourse(course_str);
            }
        });

        $(document).on("click", ".modal-add-course-selected-course", function(){
            var course_str = $(this).find(".modal-add-course-selected-title span").text();
        
            if($(this).hasClass("course-item-selected")){
                popupAddCourse.actionUnselectStagedCourse(course_str);
            }else{
                popupAddCourse.actionSelectStagedCourse(course_str);
            }
        });
    }

    static configureStagingActions(popupAddCourse){
        $("#modal-add-course-action-add").on("click", function(){
            popupAddCourse.actionStageCourses();
        });
        $("#modal-add-course-action-remove").on("click", function(){
            popupAddCourse.actionUnstageCourses();
        });
    }

    static configureSubmitActions(popupAddCourse, popupReqs){
        // Modal add course submit courses to program action
        $("#modal-add-course-submit").click(function(){
            popupAddCourse.actionSubmitCourses();
            popupReqs.forceUpdate();
        });        
    }
}

export default AddCourse;