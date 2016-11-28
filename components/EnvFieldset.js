import React, {PropTypes} from 'react';
import {style} from 'next/css';
import Field from '../components/Field';
import Input from '../components/Input';
import Hint from '../components/Hint';
import Button from '../components/Button';

const styles = {
  key: ({error}) => style({
    'color': error ? '#f00' : '#dbcb00',
    'fontSize': '11px',
    'fontWeight': 700,
    'width': '120px',
    '::-webkit-input-placeholder': {
      color: error ? '#f00' : '#dbcb00'
    }
  }),
  value: style({
    width: '222px !important'
  }),
  equals: style({
    width: '30px',
    display: 'inline-block'
  }),
  btn: style({
    width: 25,
    height: 25,
    display: 'inline !important',
    padding: '0 !important',
    margin: '5px 0 0 15px !important',
    boxSizing: 'border-box'
  }),
  hint: ({required}) => style({
    marginLeft: `${required ? 55 : 15}px !important`
  })
};

const EnvFieldset = ({env, index, onChange, onRemove, error}) => (
  <div>
    <Field error={error}>
      <Input name={`${index}.key`}
        value={env.key}
        type="text"
        onChange={onChange}
        placeholder={`ENV_VAR_${index+1}`}
        error={error}
        {...styles.key({error})} />

      <div {...styles.equals}>=</div>

      <Input name={`${index}.value`}
        value={env.value}
        type="text"
        onChange={onChange}
        placeholder="value"
        error={error}
        {...styles.value} />
    </Field>

    {!env.required && (
      <Button onClick={onRemove} {...styles.btn}>-</Button>
    )}

    <Hint error={error} {...styles.hint({required: env.required})} />
  </div>
);

EnvFieldset.propTypes = {
  env: PropTypes.object,
  index: PropTypes.number,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  error: PropTypes.string
};

export default EnvFieldset;
