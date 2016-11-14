import React from 'react'
import {style} from 'next/css'

export default ({error, ...props}) => (
  <input {...props}
    className={styles({error})} />
)

const styles = ({error}) => style({
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  background: 'rgba(0, 0, 0, 0)',
  border: 'none',
  color: error ? '#f00' : '#000',
  fontFamily: 'Menlo, Monaco, Lucida Console, Courier New, monospace, serif',
  fontSize: '13px',
  outline: 'none',
  width: '252px',
  height: '35px'
})
