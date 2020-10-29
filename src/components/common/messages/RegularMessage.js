import React from 'react';
import ClassNames from 'classnames';
import ReactEmoji from 'react-emoji'

const RegularMessage = ({ message: { sender: { id, name }, text }, myId }) => {

  const isMyMessage = () => myId === id

  const classes = ClassNames({
    'single-message': true,
    'single-message--my-message': isMyMessage(),
  })


  return (
    <li className={classes}>
      <div className='message-container'>
        <p>{ ReactEmoji.emojify(text) }</p>
        <p className='single-message__sender'>{ isMyMessage() ? 'You' : name }</p>
      </div>
    </li>
  );
};

export default RegularMessage;
