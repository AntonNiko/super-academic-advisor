import React from 'react';
import ReactDOM from 'react-dom';
import './Style.css';
import Test from './Test';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Program from './Program';
import Semester from './Semester';
import * as serviceWorker from './serviceWorker';

var program_sequence_seng_rec = {
    "1A":[["CSC 111","ENGR 130","ENGR 110","MATH 100","MATH 110","PHYS 110"],2018,"F"],
    "1B":[["CSC 115","ENGR 120","MATH 101","ENGR 141","PHYS 111"],2019,"Sp"],
    "1C":[[],2019,"Su"],
    "2A":[["MATH 122"],2019,"F"],
    "2B":[[],2020,"Sp"],
    "2C":[[],2020,"Su"]
  }  

ReactDOM.render(<Navbar />, document.getElementById('navigation'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<Program program_sequence={program_sequence_seng_rec}/>, document.getElementById('panel-container-parent'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

/* 
React Components:
- Navbar
- Sidebar
- Program container 
- Semester containers
- Course containers 
- Pop-up modal
All visual
*/
