import React from 'react'
import {style} from 'next/css'

export default ({text, error, ...props}) => (
  <div className={styles({error})} {...props}>
    {error ? error : text}
  </div>
)

const styles = ({error}) => style({
  display: 'inline-block',
  marginLeft: '55px',
  color: error ? '#f00' :'#ababab',
  fontSize: '11px',
  marginBottom: '10px'
})
