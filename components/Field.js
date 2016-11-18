import React, {PropTypes} from 'react';
import {style} from 'next/css';

const styles = ({error}) => style({
  display: 'inline-block',
  borderBottom: `2px solid ${error ? '#f00' : '#d8d8d8'}`,
  marginBottom: '10px'
});

const Field = ({error, children}) => (
  <div className={styles({error})}>
    {children}
  </div>
);

Field.propTypes = {
  error: PropTypes.string,
  children: PropTypes.node
};

export default Field;
