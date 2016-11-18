import React, {PropTypes} from 'react';
import {style} from 'next/css';

const styles = ({error}) => style({
  color: error ? '#f00' : '#dbcb00',
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  marginRight: '2px',
  width: '100px'
});

const Label = ({htmlFor, text, error}) => (
  <label htmlFor={htmlFor} className={styles({error})}>
    {text}:
  </label>
);

Label.propTypes = {
  htmlFor: PropTypes.string,
  text: PropTypes.string,
  error: PropTypes.string
};

export default Label;
