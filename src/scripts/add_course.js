import $ from 'jquery';

class AddCourse {
    static configureModalAnimations(modalAddCourse) {
        // Modal add course table toggle animation
        $(".modal-add-course-subject").on("click", function() {
            $(this).next().slideToggle(200);
            $(this).find(".modal-chevron-collapsed").toggleClass("modal-chevron-expanded");
        });

        // Modal add course table select action
        $(".modal-course-item").on("click", function() {
            var course_str = $(this).find("span").text();

            if ($(this).hasClass("course-item-selected")) {
              modalAddCourse.actionUnselectUnstagedCourse(course_str);
            } else {
              modalAddCourse.actionSelectUnstagedCourse(course_str);
            }
        });

        $(document).on("click", ".modal-add-course-selected-course", function() {
            var course_str = $(this).find(".modal-add-course-selected-title span").text();

            if ($(this).hasClass("course-item-selected")) {
                modalAddCourse.actionUnselectStagedCourse(course_str);
            } else {
                modalAddCourse.actionSelectStagedCourse(course_str);
            }
        });
    }

    static configureStagingActions(modalAddCourse) {
        $("#modal-add-course-action-add").on("click", function() {
            modalAddCourse.actionStageCourses();
        });

        $("#modal-add-course-action-remove").on("click", function() {
            modalAddCourse.actionUnstageCourses();
        });
    }

    static configureSubmitActions(modalAddCourse, requirements) {
        // Modal add course submit courses to program action
        $("#modal-add-course-submit").click(function() {
            modalAddCourse.actionSubmitCourses();
            requirements.forceUpdate();
        });
    }
}

export default AddCourse;
