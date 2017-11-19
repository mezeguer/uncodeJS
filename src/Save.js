import React, { Component } from 'react';

import ReactFileReader from 'react-file-reader';

import './App.css';

class Save extends Component {

  //=============================================== REDERING

  render() {
    return (
      <div className = "bSave">
        <input
          ref={el => this.value = el}
          className="snippetName"
          placeholder="ENTER SNIPPET NAME"
        />
        <button
          ref = "savingBut"
          className="savingBut"
          onClick={() => this.props.func(this.value)}>
          <img className="SaveIcon" alt="save" src={require('./assets/save.png')} />
        </button>
      </div>
    );
  }
}

export default Save;
