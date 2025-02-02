import React from 'react';
import classnames from 'classnames';

const input = ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onChange,
  disabled,
}) => (
  <div className="form-group">
    <input
      type={type}
      value={value}
      className={classnames('form-control form-control-lg', {
        'is-invalid': error,
      })}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      disabled={disabled}
    />
    {info && <small className="form-text text-muted">{info}</small>}
    {error && <div className="invalid-feedback">{error}</div>}
  </div>
);

export default input;
