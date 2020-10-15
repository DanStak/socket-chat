import React, { useState } from 'react';
import callIfCallable from "../../../utils/callIfCallable";
import ClassNames from 'classnames';

const FormInput = ({ placeholder = '', label = '', onChange = () => {} }) => {
  const [value, setValue] = useState('');
  const [isDanger, setIsDanger] = useState(false);

  const handleChange = (event) => {
    const { target: { value } } = event;
    setValue(value)
    setIsDanger(!value)
    callIfCallable(onChange, value)
  }

  const inputClasses = ClassNames({
    'input': true,
    'is-danger': isDanger
  })

  return (
    <div className="field">
      <label className="label has-text-light">{label}</label>
      <div className="control">
        <input
          className={inputClasses}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default FormInput;
