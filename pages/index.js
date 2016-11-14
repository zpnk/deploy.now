import React from 'react'
import {style, insertRule} from 'next/css'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Form from '../components/Form'
import {isRepoUrl} from '../lib/validate'

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      deploying: false,
      deployedUrl: null,
      _errors: {}
    }
  }

  static async getInitialProps() {
    return {
      deployService: process.env.DEPLOY_SERVICE
    }
  }

  componentWillMount() {
    const {query} = this.props.url

    if (query.repo && !isRepoUrl(query.repo)) {
      this.setState({_errors: {
        repo: 'Cannot build that repo, please enter one'
      }})
    }
  }

  deploy = async ({repo, zeitToken, envs}) => {
    this.setState({deploying: true})

    const { deployService, url: {query} } = this.props

    if (isRepoUrl(query.repo)) {
      repo = query.repo
    }

    try {
      const deploy = await axios.post(deployService, {repo, zeitToken, envs})

      this.setState({deployedUrl: deploy.data.url, deploying: false})
    } catch(error) {
      this.setState({
        _errors: {
          deploy: 'Deploy failed, please check the repo and try again.'
        },
        deploying: false
      })
    }
  }

  render() {
    const { query } = this.props.url
    const { deploying, deployedUrl, _errors } = this.state

    return (
      <main>
        <Header title='Deploy to now' />

        <h2 className={styles.title}>
          ## Deploy to <a href="https://now.sh">now</a>
        </h2>

        { query.repo && !_errors.repo ?
          <p>
            Deploying <a href={query.repo}>{query.repo.split('.com/')[1]}</a>
          </p>
        : null
        }

        { deploying ?
          <p>Initialising...</p>
        : <p>{_errors.deploy || _errors.repo}</p>
        }

        { deployedUrl ?
          <div>
            <p>Your deployment has been queued!</p>
            <p>
              Your app will be available at
              {' '}<a href={deployedUrl}>{deployedUrl}</a>
            </p>
          </div>
        : null
        }

        { !deployedUrl && !deploying ?
          <Form initialEnvs={query.env}
            needRepo={!query.repo || _errors.repo}
            onSubmit={this.deploy} />
        : null
        }

        <Footer />
      </main>
    )
  }
}

const styles = {
  title: style({
    fontSize: '12px',
    fontWeight: 700,
  })
}
