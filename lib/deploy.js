const {exec} = require('child_process')
const path = require('path')
const download = require('download-package-tarball')
const parseGitHubURl = require('parse-github-url')

const DEPLOY_DIR = path.resolve('/tmp/.stage-deploys')
const NOW = path.resolve('./node_modules/.bin/now')

async function deploy(repo, zeitToken, envs) {
  console.log(`> Deploying ${repo}`)

  // TODO: handle invalid repo
  const {owner, name, branch} = parseGitHubURl(repo)

  const url = `https://github.com/${owner}/${name}/archive/${branch}.tar.gz`
  const dir = path.join(DEPLOY_DIR, owner)

  console.log(`> Fetching ${url}`)

  // TODO: handle download error
  await download({url, dir})

  const cwd = path.join(DEPLOY_DIR, owner, name)
  // TODO: handle now error
  return await now(zeitToken, envs, cwd)
}

function now(zeitToken, envs, cwd) {
  return new Promise((resolve, reject) => {
    const nowProc = exec(`${NOW} ${envFlags(envs)} --token ${zeitToken}`, {cwd})

    nowProc.stdout.on('data', (url) => {
      if (!url) reject(new Error('could not parse url'))
      console.log(`> Ready! ${url}`)
      resolve(url)
    })

    nowProc.on('close', (code) => {
      rmdir(cwd)
    })
  })
}

function envFlags(envs) {
  if (!envs || !envs.length) return ''

  const flags = envs.map((env) => {
    if (/[^A-z0-9_]/i.test(env.key)) return

    return `-e ${env.key}="${env.value}"`
  }).join(' ').trim()

  return flags
}

function rmdir(dir) {
  return new Promise((resolve) => {
    const rmProc = exec(`rm -r ${dir}`)

    rmProc.on('close', (code) => {
      resolve()
    })
  })
}

module.exports = deploy
