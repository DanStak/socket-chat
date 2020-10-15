import React, { useState } from 'react';
import FormInput from '../../common/inputs/FormInput';
import connect from "../../../containers/conversation/connect";
import { withRouter } from 'react-router-dom';

const LoginForm = ({ conversation, history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const isFormValid = () => {
    return (name && room)
  }

  const handleSetConversationParams = (event) => {
    event.preventDefault();
    if(isFormValid()) {
      // conversation.setName(name);
      // conversation.setRoom(room);
      history.push(`/conversation?room=${room}&name=${name}`)
    }
  }

  return (
    <div className='login-page__form'>
      <h1 className="title is-1 has-text-light">Log In</h1>

      <form onSubmit={handleSetConversationParams}>
        <FormInput
          icon='fa-user'
          placeholder='Type username'
          label='Username'
          onChange={setName}
        />

        <FormInput
          icon='fa-user'
          placeholder='Type room name'
          label='Room name'
          onChange={setRoom}
        />
        <button
          className="button is-medium is-fullwidth mt-4"
          type='submit'
        >
          SUBMIT
        </button>
      </form>


    </div>
  );
};

export default withRouter(LoginForm);
