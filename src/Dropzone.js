import React, { Component } from 'react';

import ReactFileReader from 'react-file-reader';

import './App.css';
import { translations } from './assets/translations/config';

class DragDrop extends Component {

  handleFileChange = files => {
    try { var reader = new FileReader();
    reader.onload = () => {
      this.props.func(reader.result);
      console.log(reader.result)
    }
    console.log(reader.readAsText(files[0]));
  } catch (e) {
      alert(translations.dictionary.drop_zone_invalid_file_type);
    }
  }

  //=============================================== REDERING

  render() {
    return (
      <div className="Editor">
        <div className="DropZone">
          <p style={{
            color: 'grey',
            textAlign: 'center',
            fontWeight: '300'
          }}>{translations.dictionary.drop_zone_explanation}</p>
          <ReactFileReader
            handleFiles={this.handleFileChange}
            fileTypes={'.js'}>
            <button className="about-button"
              style={{
                width: '100px',
                fontFamily: 'Roboto',
                fontWeight: '300'
              }}>{translations.dictionary.drop_zone_upload_button}</button>
          </ReactFileReader>
        </div>
      </div>
    );
  }
}

export default DragDrop;
