import React, { Component, createRef } from 'react';
import Semester from './Semester';
import logo from './logo.svg';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/draggable';
import './PopupReqs.css';

class PopupReqs extends Component {
    render(){
        return (
          <div class="modal-reqs-details" id="modal-reqs">
            <div class="modal-reqs-details-content" id="modal-reqs-content">
                
    	    </div>
          </div>
        );
    }
}

export default PopupReqs;