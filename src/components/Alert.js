import React from 'react'
import {css, merge} from 'glamor'

export default ({type = 'error', message, className, ...props}) => (
  <div className={merge(css(styles[type], className))} {...props}>
    {message}
  </div>
)

const styles = {
  error: {
    backgroundColor: '#F43F52',
    background: 'linear-gradient(#F43F52, #E04949)',
    color: '#FFFFFF',
    borderRadius: '3px',
    padding: '20px',
    margin: '5px'
  }
}