const {exec} = require('child_process');
const path = require('path');
const download = require('download-package-tarball');
const parseRepoURL = require('./parse-repo-url');

const DEPLOY_DIR = path.resolve('/tmp/.stage-deploys');
const NOW = path.resolve('./node_modules/.bin/now');

async function deploy(repo, config) {
  console.log(`> Deploying ${repo}`);

  const {owner, name, repoBranch, branchDirectory} = parseRepoURL(repo);

  const url = `https://github.com/${owner}/${name}/archive/${repoBranch}.tar.gz`;
  const dir = path.join(DEPLOY_DIR, owner);

  console.log(`> Fetching ${url}`);

  await download({url, dir});

  const cwd = path.join(DEPLOY_DIR, owner, name.split('.')[0], branchDirectory);

  return await now(cwd, config);
}

function now(cwd, {token, docker, envs}) {
  return new Promise((resolve, reject) => {
    envs.unshift({key: 'ZEIT_API_TOKEN', value: token});

    const dockerFlag = docker ? '--docker' : '';
    if (!/[^A-z0-9_]/i.test(token)) {
      throw Error('Invalid token')
    }
    const tokenFlag = `--token ${token}`;
    const cmd = `${NOW} ${envFlags(envs)} ${dockerFlag} ${tokenFlag} --public`;

    const nowProc = exec(cmd, {cwd});

    nowProc.stdout.on('data', (url) => {
      if (!url) reject(new Error('could not parse url'));
      console.log(`> Ready! ${url}`);
      resolve(url);
    });

    nowProc.stderr.on('data', (error) => {
      reject(new Error(error));
    });

    nowProc.on('close', () => {
      rmdir(cwd);
    });
  });
}

function envFlags(envs) {
  if (!envs || envs.length === 0) return '';

  return envs
  .filter((env) => !/[^A-z0-9_]/i.test(env.key))
  .map((env) => `-e ${env.key}="${env.value}"`)
  .join(' ')
  .trim();
}

function rmdir(dir) {
  return new Promise((resolve) => {
    const rmProc = exec(`rm -r ${dir}`);

    rmProc.on('close', () => {
      resolve();
    });
  });
}

module.exports = deploy;
