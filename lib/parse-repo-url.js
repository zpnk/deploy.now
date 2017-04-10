const parseGitHubURL = require('parse-github-url');

// exports some default values returned from parse-github-url and some values unique to this use case
module.exports = (fullRepoURL) => {
  const {host, owner, name, repo, branch} = parseGitHubURL(fullRepoURL);
  const repoURL = `https//${host}/${repo}`;
  const repoBranch = branch.split('/')[0];
  const branchDirectory = branch.split(`${repoBranch}/`)[1] || '';

  return {
    owner,
    name,
    repoName: repo,
    repoURL,
    repoBranch,
    branchDirectory
  };
};
