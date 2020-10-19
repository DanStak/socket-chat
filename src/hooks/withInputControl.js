import React, {useState} from 'react';

const withInputControl = WrappedComponent => {

  const WithInputControl = (props) => {
    const [value, setValue] = useState('');

    return (
      <WrappedComponent
        value={value}
        onSetValue={setValue}
        {...props}
      />
    )

  }
  return WithInputControl;
};

export default withInputControl;
