import React, {Component} from 'react'
import {css, merge} from 'glamor'
import Editor from './components/Editor'
import Alert from './components/Alert'
import Copy from './components/Copy'

export default class Compiler extends Component {
  constructor () {
    super()
    this.state = {
      output: `
  "use strict";

  React.createElement(
    "div",
    { className: css(styles.main) },
    React.createElement(
      "header",
      { className: css(styles.header) },
      React.createElement(
        "h1",
        { className: css(styles.title) },
        "JSX Live Editor"
      )
    ),
    React.createElement(
      "div",
      { className: css(styles.container) },
      React.createElement(Compiler, null)
    )
  );
  `,
      error: '',
      input: `
  <div className={css(styles.main)}>
    <header className={css(styles.header)}>
      <h1 className={css(styles.title)}>
        JSX Live Editor
      </h1>
    </header>
    <div className={css(styles.container)}>
      <Compiler />
    </div>
  </div>
    `
    }
    this.transpile = this.transpile.bind(this)
  }
  transpile (code) {
    try {
      this.setState({
        input: code,
        output: Babel.transform(code, {presets: ['es2015','react']}).code,
        error: ''
      })
    } catch (error) {
      this.setState({
        input: code,
        error: error.message
      })
    }
  }
  buildExport () {
    const { output, input } = this.state

    return `
    /*
      JSX Transpiled with https://jsx-live.now.sh/

      From:
      ${input}
    */

    var element = ${output};

    ReactDOM.render(
      element,
      document.getElementById('root')
    );
   `
  }
  render () {
    const {input, error, output} = this.state
    return (
      <div>
        <div className={css(styles.container)}>
          <div className={merge(css(styles.column), css(styles.firstC))}>
            <Editor
              className={css(styles.editor)}
              codeText={input}
              onChange={this.transpile}
              theme='material'
              title="input.jsx"
            />
          </div>
          <div className={css(styles.column)}>
            <div className={css(styles.output)}>
              {error && <Alert
                className={css(styles.alert)}
                message={error}
              />}
              <Editor
                codeText={output}
                theme='ultraviolet'
                title='output.js'
                readOnly
              />
            </div>
          </div>
        </div>
        <button>
          <Copy text={this.buildExport()} onCopy={() => console.log('Copied!!!!')}>
            Export
          </Copy>
        </button>
      </div>
    )
  }
}

const styles = {
  container: {
    display: 'flex',
    borderRadius: '3px',
  },
  column: {
    width: '50%',
    position: 'relative'
  },
  firstC: {
    marginRight: '20px'
  },
  alert: {
    position: 'absolute',
    zIndex: 10,
    bottom: 0,
    right: 0
  }
}
