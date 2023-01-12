#!/usr/bin/env node

import chalk from 'chalk';
const { resolve } = require('path');
const { create } = require('create-create-app');

const templateRoot = resolve(__dirname, '..', 'templates');

const caveat = () => {
return `
${chalk.yellow("Directus with MySQL, Adminer, and GraphiQL:")}

Installed successfully.

${process.argv}
`
}

create('create-directus-docker', {
  templateRoot,
  after: ({ answers }) => {
    //custom stuff to do or print out here...
    let msg = `cd ${answers.name} && npm start`
    console.log(`To configure and launch all services, run ${chalk.green(msg)}`);
  },
  caveat,
});
