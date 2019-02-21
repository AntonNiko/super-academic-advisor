import React from 'react';
import ReactDOM from 'react-dom';
import './Style.css';
import App from './App';
import Test from './Test';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import SemesterContainer from './SemesterContainer';
import * as serviceWorker from './serviceWorker';

//ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Navbar />, document.getElementById('navigation'));
ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
ReactDOM.render(<SemesterContainer />, document.getElementById('panel-container'));

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
