import React from 'react';

const WelcomeMessage = () => {
  return (
    <div className='welcome-message'>
      <h1 className='has-text-weight-medium is-size-1-widescreen'>Welcome in my Chat App!</h1>
      <p>
        Feel free to talk with other users,
        click to one of them and start conversation!
        Type emojis faces, for example :D in input and send it to share your emotions!
        If you want to say something to me, click HERE to start conversation!
      </p>
    </div>
  );
};

export default WelcomeMessage;
