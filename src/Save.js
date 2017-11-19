import React, { Component } from 'react';

import ReactFileReader from 'react-file-reader';

import './App.css';
import { translations } from './assets/translations/config';

class Save extends Component {

  //=============================================== REDERING

  render() {
    return (
      <div className = "bSave">
        <input
          ref={el => this.value = el}
          className="snippetName"
          placeholder={translations.dictionary.save_snpt_name_placeholder}
          maxLength="12"
        />
        <div
          ref = "savingBut"
          className="savingBut"
          onClick={() => this.props.func(this.value)}>
          <p className='savingText'>save</p>
        </div>
      </div>
    );
  }
}

export default Save;
