import $ from 'jquery';

class AddSemester {
    static configureAddSemesterAction(program, SortableProgram) {
        $(function() {
            $("#add-semester-button").click(function() {
                program.actionAddSemester();
                SortableProgram.configureSortable(program);
              });
        });
    }
}

export default AddSemester;
