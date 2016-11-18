import React, {PropTypes} from 'react';
import {style} from 'next/css';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Form from '../components/Form';
import {isRepoUrl} from '../lib/validate';

const styles = {
  quote: style({
    fontSize: '12px',
    fontWeight: 100,
    fontStyle: 'italic'
  })
};

export default class Index extends React.Component {
  static propTypes = {
    url: PropTypes.object.isRequired
  }

  state = {
    deploying: false,
    deployedUrl: null,
    _errors: {}
  }

  componentWillMount() {
    const {query} = this.props.url;

    if (query.repo && !isRepoUrl(query.repo))
      this.setState({_errors: {
        repo: 'Cannot build that repo, please enter one'
      }});
  }

  handleDeploy = async ({repo, zeitToken, envs}) => {
    this.setState({deploying: true});

    const {url: {query}} = this.props;

    if (isRepoUrl(query.repo)) repo = query.repo;

    try {
      const deploy = await axios.post('/api/deploy', {repo, zeitToken, envs});

      this.setState({deployedUrl: deploy.data.url, deploying: false});
    } catch (error) {
      this.setState({
        _errors: {
          deploy: 'Deploy failed, please check the repo and try again.'
        },
        deploying: false
      });
    }
  }

  render() {
    const {query} = this.props.url;
    const {deploying, deployedUrl, _errors} = this.state;

    return (
      <main>
        <Header title="Now: deploy instantly" />

        <h2 className={styles.quote}>
          &gt; One click deploys to <a href="https://now.sh">&#9651; now</a>
        </h2>

        {(query.repo && !_errors.repo) && (
          <p>
            Deploying <a href={query.repo}>{query.repo.split('.com/')[1]}</a>
          </p>
        )}

        {deploying && (<p>Initialising...</p>)}

        {!deploying && (<p>{_errors.deploy || _errors.repo}</p>)}

        {deployedUrl && (
          <div>
            <p>Your deployment has been queued!</p>
            <p>
              Your app will be available at
              {' '}<a href={deployedUrl}>{deployedUrl}</a>
            </p>
          </div>
        )}

        {(!deployedUrl && !deploying) && (
          <Form initialEnvs={query.env}
            needRepo={!query.repo || _errors.repo}
            onSubmit={this.handleDeploy} />
        )}

        <Footer />
      </main>
    );
  }
}
