import React, { Component } from 'react';
import axios from 'axios';
import './snippets.css';
import SocketIoClient from 'socket.io-client';
import { Snip } from './snip';

export class Snippets extends Component {
  constructor () {
    super();
    this.state = {
      snips: [],
      searchSnip: []
    }
  }

  async componentDidMount() {
    console.log(this.props.id);
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URI}/snippet/${this.props.id}`)
    .catch(e => console.log('error', e));
    if (response.data) this.setState({ snips:response.data.snippetList, searchSnip: response.data.snippetList});
  }

  sendSnip = (value) => {
    console.log(this.props);
    this.props.socket.emit('send', value, this.props.language);
    this.props.fire(value);
  }

  renderSearch = () => {//UGLY AF CODE SORRY
    return (
      <div style={{display:'flex',flexDirection:'row',alignItems:'center',height:'100%'}}>
        <input onChange={(e) => this.filterSnips(e.target.value)} style={{height:'80%', fontSize:'12px', border:'none', borderBottom:'solid',borderWidth:'1px',borderColor:'#ddd', outline: 'none',
        padding:'5px'}}/>
      </div>
    );
  }

  filterSnips = (arg) => {
    const res = this.state.snips.filter( el => {
      if (!arg) return true;
      return (el.title.indexOf(arg) !== -1);
    })
    console.log('=-=-=-=-', res);
    this.setState({searchSnip:res})
  }

  renderSnips = () => {
    return this.state.searchSnip.map( ind => {
      return (
        <a className="snip-container-wrapper" onClick={this.sendSnip.bind(this, ind.code)}>
          <Snip key={ind._id} props={ind}/>
        </a>
      )
    })
  }

  render() {
    return (
      <div className="snippets-container">
        <div className="snippets-title"><h3>Your Code Snippets</h3>{this.renderSearch()}</div>
        <div className="snippets-body">
          {this.renderSnips()}
        </div>
      </div>
    );
  }
}
