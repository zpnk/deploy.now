import React, {PropTypes} from 'react';
import Field from '../components/Field';
import Label from '../components/Label';
import Input from '../components/Input';
import Hint from '../components/Hint';

const TextFieldset = ({
  name,
  label,
  value,
  placeholder,
  onChange,
  error,
  hint
}) => (
  <div>
    <Field error={error}>
      <Label htmlFor={name} text={label} error={error} />
      <Input name={name}
        value={value}
        onChange={onChange}
        type="text"
        placeholder={placeholder}
        error={error} />
    </Field>
    <Hint text={hint} error={error} />
  </div>
);

TextFieldset.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  hint: PropTypes.node
};

export default TextFieldset;
