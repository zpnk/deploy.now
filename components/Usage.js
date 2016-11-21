import React from 'react';
import {style} from 'next/css';

const styles = {
  h2: style({
    fontSize: '13px',
    fontWeight: 700
  }),
  pre: style({
    backgroundColor: '#f7f7f7',
    padding: 15,
    whiteSpace: 'pre-wrap',
    lineHeight: 1.4
  }),
  code: style({
    background: 'rgba(0,0,0,0.04)',
    padding: '0.2em',
    fontSize: '95%'
  }),
  noBorder: style({
    border: 'none'
  }),
  img: style({
    margin: '15px 0'
  })
};

const Usage = () => (
  <div>
    <h2 className={styles.h2}>## Usage</h2>
    <p>To add one-click deploys to your open source project, include the button to your
    readme:</p>

    <pre className={styles.pre}>
      [![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/zpnk/hello-world)
    </pre>
    <p>
      Be sure to set the <code className={styles.code}>repo</code> parameter to the GitHub url of your project.
      This will result in the following link:
    </p>

    <p>
      <a href="https://deploy.now.sh/?repo=https://github.com/zpnk/hello-world" className={styles.noBorder}>
        <img src="/static/button.svg" className={styles.img} />
      </a>
    </p>

    <p>
      If your app requires users to specify environment variables,
      you may include these in the <code className={styles.code}>deploy</code> url:
    </p>

    <pre className={styles.pre}>
      https://deploy.now.sh/?repo=https://github.com/zpnk/hello-world&env=GREETING&env=RECIPIENT
    </pre>

    <p>The user will then be asked for these when deploying the app.</p>
  </div>
);

// Usage.propTypes = {
//   error: PropTypes.string,
//   children: PropTypes.node
// };

export default Usage;
