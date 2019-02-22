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
    console.log(this.state.sequence);
    var semesters = [];
    for(var semester_id in this.state.sequence){
      semesters.push(<Semester courses={this.state.sequence[semester_id]}/>);
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
