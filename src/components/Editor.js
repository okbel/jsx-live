import React from 'react'
import Codemirror from 'react-codemirror'
import 'codemirror/mode/jsx/jsx'
import {css, merge} from 'glamor'

export default ({codeText, onChange, theme = 'material', mode = 'jsx', readOnly, ...props}) => {
  const options = {
    lineNumbers: false,
    lineWrapping: true,
    smartIndent: false,
    matchBrackets: true,
    readOnly,
    mode,
    theme
  }
  return (
    <div className={css(styles.codeBox)}>
      <div className={css(styles.header[theme])}>
        <div className={css(styles.actions)}>
          <span className={merge(css(styles.ball), css(styles.close))}></span>
          <span className={merge(css(styles.ball), css(styles.min))}></span>
          <span className={merge(css(styles.ball), css(styles.max))}></span>
        </div>
        <span className={css(styles.title)} >{props.title}</span>
      </div>
      <Codemirror
        options={options}
        value={codeText}
        onChange={(code) => onChange(code)}
        {...props}
      />
    </div>
  )
}

const styles = {
  title: {
    display: 'block',
    textAlign: 'center',
    color: 'white',
    fontSize: '12px'
  },
  actions: {
    display: 'inline-block',
    position: 'absolute',
    lineHeight: '15px'
  },
  header: {
    ultraviolet: {
      backgroundColor: '#202235',
      background: 'linear-gradient(90deg, #202235, #313452)',
      padding: '10px',
      borderBottom: 'solid 1px #464875',
      position: 'relative'
    },
    material: {
      backgroundColor: '#222527',
      background: 'linear-gradient(90deg, #222527, #2d3133)',
      padding: '10px',
      borderBottom: 'solid 1px #394249',
      position: 'relative'
    }
  },
  codeBox: {
    borderRadius: '3px',
    overflow: 'hidden'
  },
  ball: {
    display: 'inline-block',
    height: '10px',
    width: '10px',
    borderRadius: '20px',
    marginRight: '5px',
    boxSizing: 'border-box'
  },
  close: {
    backgroundColor: '#FC6057',
    border: 'solid 1px #e15954'
  },
  min: {
    backgroundColor: '#FDBD2E',
    border: 'solid 1px #e0a93d'
  },
  max: {
    backgroundColor: '#28CA40',
    border: 'solid 1px #3ab54b'
  }
}