import React, { useState } from 'react';
import FormInput from '../../common/inputs/FormInput';
import connect from "../../../containers/conversation/connect";
import { withRouter } from 'react-router-dom';

const LoginForm = ({ conversation: { socket }, history }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [nameError, setNameError] = useState('');
  const [roomError, setRoomError] = useState('');

  const isFormValid = () => {
    return (name && room)
  }

  const setValidationErrors = () => {
    if(!name) {
      setNameError('Name is required');
    }

    if(!room) {
      setRoomError('Room name is required');
    }
  }

  const setConversationParams = (event) => {
    event.preventDefault();
    setValidationErrors();
    if(isFormValid()) {
      socket.emit('check-name-is-taken', name, (error) => {
        if(error) {
          setNameError(error);
          return;
        }
        history.push(`/conversation?room=${room}&name=${name}`)
      })
    }
  }

  const setValue = (value, callback) => {
      callback(value);
      resetErrors();
  }

  const resetErrors = () => {
    setNameError('');
    setRoomError('');
  }


  return (
    <div className='login-page__form'>
      <h1 className="has-text-centered title is-3 has-text-light">Join Us</h1>

      <form onSubmit={setConversationParams}>
        <FormInput
          placeholder='Type Username'
          error={nameError}
          onChange={(value) => setValue(value, setName)}
          name='name'
        />

        <FormInput
          placeholder='Type Room Name'
          error={roomError}
          onChange={(value) => setValue(value, setRoom)}
          name='room'
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
