import React from 'react';
import moment from "moment";
import ClassNames from 'classnames';

const SingleMessage = ({ message: { date, message, name, id,}, userName }) => {

  const relativeDate = moment(new Date(date)).fromNow();
  const isMyMessage = name === userName
  const classes = ClassNames({
    'single-message': true,
    'single-message--my-message': isMyMessage,
  })
  return (
    <li className={classes}>
      <div>
        <span className='single-message__name'>{isMyMessage ? 'You' : name}</span>
        <span>{relativeDate}</span>
      </div>
      <p>{message}</p>
    </li>
  );
};

export default SingleMessage;
