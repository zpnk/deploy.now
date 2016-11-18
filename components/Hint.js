import React, {PropTypes} from 'react';
import {style} from 'next/css';

const styles = ({error}) => style({
  display: 'inline-block',
  marginLeft: '55px',
  color: error ? '#f00' :'#ababab',
  fontSize: '11px',
  marginBottom: '10px'
});

const Hint = ({text, error, ...props}) => (
  <div className={styles({error})} {...props}>
    {error ? error : text}
  </div>
);

Hint.propTypes = {
  text: PropTypes.node,
  error: PropTypes.string
};

export default Hint;
