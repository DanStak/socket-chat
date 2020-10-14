import React from 'react';
import ConversationContext from "./context";
import queryString from 'query-string';
import { withRouter } from "react-router-dom";
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'

class ConversationProvider extends React.Component {
  state = {
    name: '',
    room: '',
  }

  socket = io(SERVER_URL);


  componentDidMount() {
    const {name, room} = queryString.parse(this.props.location.search);
    if (name && room) {
      this.setState({
        name,
        room
      })
    }
  }

  setName = (name) => {
    this.setState({
      name
    })
  }

  setRoom = (room) => {
    this.setState({
      room
    })
  }

  getContext = () =>({
      name: this.state.name,
      room: this.state.room,
      setName: this.setName,
      setRoom: this.setRoom,
  });

  render() {
    return (
      <ConversationContext.Provider value={this.getContext()}>
        {this.props.children}
      </ConversationContext.Provider>
    );
  }
}

export default withRouter(ConversationProvider);

