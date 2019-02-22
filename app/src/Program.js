import React, { Component } from 'react';
import Semester from './Semester';
import logo from './logo.svg';

class Program extends Component {
  constructor(props){
    super(props);

    this.state = {
      sequence : this.props.program_sequence,
    };
  }

  createSemesters(){
    var semesters = [];
    for(var semester_id in this.state.sequence){
      semesters.push(<Semester semester_id={semester_id} courses={this.state.sequence[semester_id]}/>);
    }
    return semesters;
  }

  render() {
    return (
      <div class="panel-container" id="panel-container">
        {this.createSemesters()}
      </div>
    );
  }
}

export default Program;
