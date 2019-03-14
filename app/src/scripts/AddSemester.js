import $ from 'jquery';

class AddSemester {
    static configureAddSemesterAction(program, SortableProgram){
        $(function(){
            $("#add-semester-button").click(function(){
                window.program.addSemester();
            
                SortableProgram.render();
              });
        });
    }
}

export default AddSemester;