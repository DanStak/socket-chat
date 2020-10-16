import React from 'react';
import ConversationContext from "./context";
import queryString from 'query-string';
import { withRouter } from "react-router-dom";
import io from 'socket.io-client';

const SERVER_URL = 'http://localhost:5000'

class ConversationProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      room: '',
    }
    this.socket = io(SERVER_URL);
  }


  componentDidMount() {
    this.setSearchParamsFromUrl();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if( this.props.location.search !== prevProps.location.search ) {
      this.setSearchParamsFromUrl();
    }
  }

  componentWillUnmount() {
    this.socket.off()
  }

  setSearchParamsFromUrl = () => {
    const {name, room} = queryString.parse(this.props.location.search);
    if (name && room) {
      this.setState({
        name,
        room
      })
    }
  }

  getContext = () =>({
      name: this.state.name,
      room: this.state.room,
      socket: this.socket,
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

