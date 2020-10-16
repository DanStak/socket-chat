import React, { useState } from 'react';
import FormInput from '../../common/inputs/FormInput';
import connect from "../../../containers/conversation/connect";
import { withRouter } from 'react-router-dom';

const LoginForm = ({ conversation: { socket }, history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [error, setError] = useState('');

  const isFormValid = () => {
    return (name && room)
  }

  const setConversationParams = (event) => {
    event.preventDefault();
    if(isFormValid()) {
      socket.emit('check-name-is-taken', name, (error) => {
        if(error) {
          setError(error);
          return;
        }
        history.push(`/conversation?room=${room}&name=${name}`)
      })
    }
  }

  const setValue = (value, callback) => {
      callback(value);

      if(error) {
        setError('');
      }
  }

  return (
    <div className='login-page__form'>
      <h1 className="has-text-centered title is-3 has-text-light">Join Us</h1>

      <form onSubmit={setConversationParams}>
        <FormInput
          icon='fa-user'
          placeholder='Type Username'
          onChange={(value) => setValue(value, setName)}
          error={error}
        />

        <FormInput
          icon='fa-user'
          placeholder='Type Room Name'
          onChange={(value) => setValue(value, setRoom)}
        />
        <button
          className="button is-small is-fullwidth mt-4 is-success"
          type='submit'
        >
          JOIN
        </button>
      </form>


    </div>
  );
};

export default withRouter(connect(LoginForm));
