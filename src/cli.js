#!/usr/bin/env node

import chalk from 'chalk';
import path from 'path';
import {fileURLToPath} from 'url';
import { resolve } from 'path';
import { create } from 'create-create-app';
// const { resolve } = require('path');
//const { create } = require('create-create-app');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
