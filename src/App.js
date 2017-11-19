import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login';
import AlertContainer from 'react-alert'

import { LogoAnim } from './logo/logo-anim';
import { Snippets } from './snippets/snippets';

import SocketIoClient from 'socket.io-client';
import axios from 'axios';

import About from './About';

import Text from './Text';
import Save from './Save';
import DragDrop from './Dropzone';

import './App.css';
import { translations } from './assets/translations/config';

class App extends Component {

  alertOptions = {
    offset: 14,
    position: 'bottom left',
    theme: 'dark',
    time: 7000,
    transition: 'scale'
  }

  constructor(props) {
    super(props);
    this.socket = SocketIoClient(process.env.REACT_APP_BACKEND_URI);
    this.state = {
      outputText: '',
      inputText: '',
      aboutFlag: false,
      language: 1,
      selected: 'editor',
      id: '',
      name: '',
      picture: null,
    }
  }

  componentDidMount() {
    this.socket.on('receive', (data) => {
      if (data) this.setState({outputText: data});
      else this.setState({outputText: `${translations.dictionary.app_empty_output_msg}`});
    })
  }

  handleLanguageChange = async (val) => {
    await this.setState({language: val});
    translations.setDictionary(this.state.language);
    this.handleTextChange(this.state.inputText);
  }

  handleTextChange = (value) => {
    this.setState({inputText: value})
    this.socket.emit('send', value, this.state.language);
  }

  handleTabSelection = (ref) => {
    this.setState({selected: ref})
  }

  handleAboutClick = () => {
    this.setState({aboutFlag:!this.state.aboutFlag})
  }

  handleFileLoad = (content) => {
    console.log(content);
    this.inputText = content;
    this.setState({selected: 'editor'});
  }

  responseFacebook = (res) => {
    console.log(res, '---------');
    if (res.name) {
      this.setState({
        name: res.name,
        id: res.id,
        picture: res.picture.data.url
        })
      this.sendToBack(res);
    }
  }

  sendToBack = (res) => {
    console.log('send', res);
    axios.post(`${process.env.REACT_APP_BACKEND_URI}login`, {
      ...res,
    })
  }

  saveSnip = (name) => {
    if (!this.state.inputText) {
      this.msg.error(translations.dictionary.app_empty_input_err_msg);
    } else if (!name.value) {
      this.msg.error(translations.dictionary.app_no_title_snpt_err_msg);
    } else {
      axios.post(`${process.env.REACT_APP_BACKEND_URI}snippet/save`, {
        code: this.state.inputText,
        userId: this.state.id,
        title: name.value
      }).then(res => {
      console.log(res);
      if (res.status === 203) {
        this.msg.error(translations.dictionary.app_title_taken_snpt_err_msg);
      } else if (res.status === 200) {
        this.msg.success(translations.dictionary.app_saved_snpt_msg)
        name.value = ''
      } else {
        this.msg.error(translations.dictionary.app_server_down_err_msg)
      }
      })
    }
  }

  //=============================================== REDERING

  renderLineNumbers () {
    const linesArr = new Array(50).fill(undefined);
    return (
      <div className="LineNumbers">
        {linesArr.map((el, i) => (('0'+(i+1)).slice(-2))).join('\n')}
      </div>
    );
  }

  renderTabSelection = () => {
    if (this.state.selected === 'editor'){
      return (
        <Text
          val={this.inputText}
          func={this.handleTextChange.bind(this)}
          placeholder={translations.dictionary.app_input_area_placeholder}
        />
      )
    } else if (this.state.selected === 'upload') {
      return (
        <DragDrop
          func={this.handleFileLoad.bind(this)}
        />
      )
    } else {
      return (<Snippets fire={this.handleFileLoad.bind(this)} language={this.state.language} value={this.state.value} socket={this.socket} id={this.state.id}/>)
    }
  }

  renderSave = () => {
    return this.state.id && this.state.selected === 'editor' ?
      <Save func={this.saveSnip.bind(this)} /> : null
  }

  render() {
    console.log(this.state, 'asdasdasdasd');
    return (
      <div className="App">
        <About
          display={this.state.aboutFlag}
          handleDisplay={this.handleAboutClick.bind(this)}/>
        <nav className="Header">
          <div className="MaxWidth">
            <LogoAnim />
            <div className="button-wrapper" style={{display:'flex', width:'380px', flexFlow:'row nowrap', alignItems:'center', justifyContent:'flex-end'}}>
              {this.state.name ? (
                <img src={this.state.picture} style={{width:'40px', borderRadius:'20px'}}/>
              ) : (
                <FacebookLogin
                  cssClass="Facebook"
                  appId="146642496064470"
                  autoLoad={true}
                  fields="name,email,picture"
                  onClick={this.sendToBack}
                  callback={this.responseFacebook}
                />
              )}
              <div className="about-button" onClick={this.handleAboutClick} style={{marginLeft:'20px'}}>
                <p className="about-button-text">{translations.dictionary.app_about}</p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexFlow: 'row nowrap',
                width: '90px',
                marginLeft:'20px'
              }}>
                <div className="lang-button"
                  style={{
                    borderBottomLeftRadius: '2px',
                    borderTopLeftRadius: '2px',
                    borderRight: '1px solid #4664a7'
                  }}
                  onClick={() => this.handleLanguageChange(1)}>EN</div>
                <div className="lang-button"
                  onClick={() => this.handleLanguageChange(2)}>ES</div>
                <div className="lang-button"
                  onClick={() => this.handleLanguageChange(3)}>IT</div>
              </div>
            </div>
          </div>
        </nav>
        <div>
          <div className="MaxWidthMain">
            <div className="Explanation">
              <p style={{
                textAlign: 'center',
                width: '100%'
              }}>
                {translations.dictionary.app_explanation}
              </p>
            </div>
            <AlertContainer ref={a => this.msg = a} {...this.alertOptions} />
            <div className="TabSelector">
              <div className="Tabs">
                <div
                  className={`Tab${this.state.selected === 'editor'
                    ? ' Selected'
                    : ''}`}
                  onClick={() => this.handleTabSelection('editor')}>{translations.dictionary.app_editor_button}</div>
                <div
                  className={`Tab${this.state.selected === 'upload'
                    ? ' Selected'
                    : ''}`}
                  onClick={() => this.handleTabSelection('upload')}>{translations.dictionary.app_upload_button}</div>
                <div
                  className={`Tab${this.state.selected === 'snippets'
                    ? ' Selected'
                    : ''}`}
                  onClick={() => this.handleTabSelection('snippets')}>{translations.dictionary.app_snippets_button}</div>
                </div>
              {this.renderSave()}
            </div>
            <div className="Form">
              {this.renderTabSelection()}
              <div className="Editor">
                {this.renderLineNumbers()}
                <textarea
                  className="Text"
                  value={this.state.outputText}
                  placeholder={translations.dictionary.app_output_area_placeholder}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
