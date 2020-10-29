import React, { useState } from 'react';
import FormInput from './inputs/FormInput';
import PasswordInput from './inputs/PasswordInput';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import API from '../../services/API';
import callIfCallable from "../../utils/callIfCallable";

const LoginForm = ({ title, requestUrl, onFinish, }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const submitForm = (event) => {
    event.preventDefault();

    axios.post(API.API_BASE + requestUrl, { name, password })
      .then((response) => {
        callIfCallable(onFinish, response.data)
      })
      .catch((error) => {
        setError(error)
       })
  }

  const setError = (error) => {

    const { name, message } = error.response.data.error;
    if(name) {
      switch (name) {
        case 'name':
          setNameError(message);
          break;
        case 'password':
          setPasswordError(message);
          break;
        default:
          return null;
      }
    }
  }

  const clearErrors = () => {
    setNameError('');
    setPasswordError('');
  }

  const setValue = (value, callback) => {
    callback(value);
    clearErrors();
  }

  return (
    <div className='login-page__form'>
      <h1 className="has-text-centered title is-3 has-text-light">{title}</h1>
      <form onSubmit={submitForm}>
        <FormInput
          placeholder='Type Username'
          error={nameError}
          onChange={(value) => setValue(value, setName)}
          name='name'
        />

        <PasswordInput
          placeholder='Type Password'
          error={passwordError}
          onChange={(value) => setValue(value, setPassword)}
          name='password'
        />
        <button
          className="button is-small is-fullwidth mt-4 is-success"
          type='submit'
        >
          {title}
        </button>
      </form>
    </div>
  );
};

export default withRouter(LoginForm);
