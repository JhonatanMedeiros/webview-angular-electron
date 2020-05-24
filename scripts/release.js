// External Libs
const { promisify } = require('util');
const inquirer = require('inquirer');
const args = require('minimist')(process.argv);
const exec = promisify(require('child_process').exec);
const { inc, valid } = require('semver');

// Project Imports
const pkg = require('../package.json');

inquireVersion(args.v || args.version)
  .then(updateVersion)
  .then(generateChangelog);

async function inquireVersion(v) {

  if (valid(v)) {
    return v;
  }

  const prompt = inquirer.createPromptModule();
  const { version } = await prompt({
    name: 'version',
    message: 'Enter a version',
    default: () => inc(pkg.version, 'patch'),
    validate: val => !!val.length || 'Invalid version'
  });

  return version;
}

async function updateVersion(version) {
  await Promise.all([
    run(`npm version ${version} --git-tag-version false`),
  ]);

  return version;
}

async function generateChangelog(version) {
  await sequential([
    () => run('npm run release:changelog')
  ]);

  return version;
}

async function sequential(tasks) {
  await tasks.reduce((promise, task) => promise.then(task), Promise.resolve());
}

async function run(cmd) {
  const {stdout, stderr} = await exec(cmd);

  stdout && console.log(stdout.trim());
  stderr && console.log(stderr.trim());
}
