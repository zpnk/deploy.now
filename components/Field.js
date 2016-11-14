import React from 'react'
import {style} from 'next/css'

export default ({error, children}) => (
  <div className={styles({error})}>
    {children}
  </div>
)

const styles = ({error}) => style({
  display: 'inline-block',
  borderBottom: `2px solid ${error ? '#f00' : '#d8d8d8'}`,
  marginBottom: '10px'
})
