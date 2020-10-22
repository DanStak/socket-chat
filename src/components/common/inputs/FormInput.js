import React, { useState } from 'react';
import callIfCallable from "../../../utils/callIfCallable";
import ClassNames from 'classnames';
import withInputControl from "../../../hooks/withInputControl";


const FormInput = ({ error = '', placeholder = '', label = '', onChange = () => {}, value, onSetValue }) => {
  const [isDanger, setIsDanger] = useState(false);

  const handleChange = (event) => {
    const { target: { value } } = event;
    onSetValue(value)
    setIsDanger(!value)
    callIfCallable(onChange, value)
  }

  const inputClasses = ClassNames({
    'input': true,
    'is-small': true,
    'is-danger': isDanger || !!error
  })

  return (
    <div className="field">
      {label && <label className="label has-text-light">{label}</label>}
      <div className="control">
        <input
          className={inputClasses}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </div>
      {error && <p className="help is-danger">{error}</p>}
    </div>
  );
};

export default withInputControl(FormInput);
