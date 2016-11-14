import React from 'react'
import {style} from 'next/css'

export default ({htmlFor, text, error}) => (
  <label htmlFor={htmlFor} className={styles({error})}>
    {text}:
  </label>
)

const styles = ({error}) => style({
  color: error ? '#f00' : '#dbcb00',
  display: 'inline-block',
  fontSize: '11px',
  fontWeight: 700,
  textTransform: 'uppercase',
  marginRight: '2px',
  width: '100px'
})
