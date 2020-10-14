import React, {Component} from 'react';
import io from 'socket.io-client';


const socket = io('http://localhost:4000');

class App extends Component {
  state = {
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      message: e.target.value,
    })
  }

  renderMessage = () => {
    socket.on('message', message => {
      console.log(message)
    })
  }

  handleSendMessage = () => {
    if(this.state.message) {
      socket.emit('message', this.state.message)
    }
  }

  render() {
    return (
      <div>
        <h1 className='has-text-link'>CHAT APP</h1>

        <input
          name='message'
          value={this.state.message}
          onChange={this.handleChange}
        />

        <button onClick={this.handleSendMessage}>SEND MESSAGE</button>
        {this.renderMessage()}
      </div>
    );
  }
}

export default App;
