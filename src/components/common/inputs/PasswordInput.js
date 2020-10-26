import React, { useState } from 'react';
import FormInput from "./FormInput";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


const PasswordInput = (props) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <div className='password-input'>
      <div className='password-input__icon'>
        {isHidden
          ? <Visibility onClick={() => setIsHidden(!isHidden)}/> :
        <VisibilityOff onClick={() => setIsHidden(!isHidden)}/>}
      </div>
      <FormInput
        type={isHidden ? 'password' : 'text'}
        {...props}
      />
    </div>

  );
};

export default PasswordInput;
