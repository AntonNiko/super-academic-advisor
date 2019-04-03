import $ from 'jquery';

class AddSemester {
    static configureAddSemesterAction(program, SortableProgram) {
        $(function() {
            $("#add-semester-button").click(function() {
                program.actionAddSemester();
                SortableProgram.render(program);
              });
        });
    }
}

export default AddSemester;
