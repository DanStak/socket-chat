import React from 'react';
import moment from "moment";
import ClassNames from 'classnames';

const SingleMessage = ({ message, myId }) => {

  const classes = ClassNames({
    'single-message': true,
    'single-message--my-message': myId === message.senderId,
  })

  return (
    <li className={classes}>
      <div className='message-container'>
        <p>{ message.text }</p>
        <p>{ message.senderName }</p>
      </div>
      {/*<div>*/}
      {/*  <p>{text}</p>*/}
      {/*  <div>*/}
      {/*  </div>*/}
      {/*</div>*/}
      {/*/!*<div>*!/*/}
      {/*  /!*<span className='single-message__name'>{isMyMessage ? 'You' : name}</span>*!/*/}
      {/*  /!*<span>{relativeDate}</span>*!/*/}
      {/*/!*</div>*!/*/}
      {/*<p>{text}</p>*/}
    </li>
  );
};

export default SingleMessage;
