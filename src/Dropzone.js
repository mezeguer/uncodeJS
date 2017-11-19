import React, { Component } from 'react';

import ReactFileReader from 'react-file-reader';

import './App.css';

class DragDrop extends Component {

  handleFileChange = files => {
    try { var reader = new FileReader();
    reader.onload = () => {
      this.props.func(reader.result);
      console.log(reader.result)
    }
    console.log(reader.readAsText(files[0]));
  } catch (e) {
    alert('Invalid file type, please upload a JavaScript file');
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
          }}>select a file or drag and drop one into the button to analyze it in uncode.js</p>
          <ReactFileReader
            handleFiles={this.handleFileChange}
            fileTypes={'.js'}>
            <button className="about-button"
              style={{
                width: '100px',
                fontFamily: 'Roboto',
                fontWeight: '300'
              }}>UPLOAD</button>
          </ReactFileReader>
        </div>
      </div>
    );
  }
}

export default DragDrop;
