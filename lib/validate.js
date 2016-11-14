export const isRepoUrl = (url) => {
  const githubRepo = /^https?:\/\/(www\.)?github\.com\/[a-zA-z0-9-.]+\/[a-zA-z0-9-.]+\/?$/

  return githubRepo.test(url)
}

const form = (fields) => {
  let errors = {}

  if (!isRepoUrl(fields.repo)) {
    errors.repo = 'Please enter a valid GitHub repo url'
  }

  if (!fields.zeitToken || fields.zeitToken.length < 24) {
    errors.zeitToken = 'Please enter a valid token'
  }

  fields.envs.forEach((env, index) => {
    if (!env.value) {
      errors['env'+index] = 'Please enter a value, or remove this envar'
    }
    if (!env.key) {
      errors['env'+index] = 'Please enter a key, or remove this envar'
    }
    if (/[^A-z0-9_]/i.test(env.key)) {
      errors['env'+index] = 'Key may only contain letters, numbers, and underscores'
    }
  })

  return errors
}

export default {
  form
}
