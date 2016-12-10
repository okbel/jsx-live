import React, {Component} from 'react'
import {css} from 'glamor'
import Compiler from './Compiler'

export default () => (
  <div className={css(styles.main)}>
    <header>
      <h1 className={css(styles.title)}>
        JS<span className={css(styles.x)}>X</span> Live Editor
      </h1>
    </header>
    <main className={css(styles.container)}>
      <Compiler />
      <span className={css(styles.by)}>
        Made with <span className={css(styles.heart)}>&#10084;</span> by
        <a className={css(styles.twitter)} href="https://twitter.com/okbel">
          @okbel
        </a>
      </span>
    </main>
  </div>
)

const styles = {
  heart: {
    color: '#cc2e49',
    fontSize: '20px',
    lineHeight: '12px'
  },
  by: {
    padding: '20px 0',
    display: 'inline-block',
    fontSize: '12px',
  },
  twitter: {
    color: '#805d2f',
    textDecoration: 'none',
    marginLeft: '5px'
  },
  header: {
    backgroundColor: '#25252D',
    background: 'linear-gradient(#25252D, #32323C)',
    marginBottom: '10px',
    color: '#C1C5CE',
    padding: '20px 0'
  },
  x: {
    color: '#f8f8f0',
  },
  title: {
    width: '90%',
    fontSize: '20px',
    padding: '30px 0',
    margin: '0 auto'
  },
  main: {
    backgroundColor: '#ECC85E',
    background: 'linear-gradient(#ECC85E, #E6B16F)',
    height: '100%'
  },
  container: {
    width: '90%',
    margin: '0 auto'
  }
}