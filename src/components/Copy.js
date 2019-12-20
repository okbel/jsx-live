import React, {useEffect} from 'react';
import Clipboard from 'clipboard';
import { css } from 'glamor';

const Copy = ({ text, children }) => {
  // const copyButtonEl = null;
  const copyRef = React.createRef();
  
  useEffect(() => {
    const clipboard = new Clipboard(copyRef.current);
    clipboard.on('success', (e) => {
      e.clearSelection();
    });
  }, []);

  return (
    <span
        ref={copyRef}
        data-clipboard-action="copy"
        data-clipboard-text={text}
        className={css(styles.copyButton)}
      >
      { children }
    </span>
  );
};

const styles = {
  copyButton: {
    position: 'absolute',
    top: 6,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, .4)',
    zIndex: 100,
    borderRadius: 3,
    height: 34,
    width: 34,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    userSelect: 'none',

    ':active': {
      transform: 'scale(.95)',

      '::after': {
        display: 'none !important'
      }
    },

    ':hover': {
      '::after': {
        display: 'block'
      }
    },

    '::after': {
      content: 'Copy',
      position: 'absolute',
      bottom: -25,
      color: 'white',
      fontSize: 13,
      padding: '2px 6px',
      borderRadius: 3,
      backgroundColor: 'rgba(0, 0, 0, .4)',
      display: 'none'
    }
  },
}

export default Copy
