#!/usr/bin/env node

import upath from 'upath';
import chalk from 'chalk';
import path from 'path';
import {fileURLToPath} from 'url';
import { create } from 'create-create-app';
import { spawn } from 'node:child_process';
import logUpdate from 'log-update';
import {execa} from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

create('create-directus-docker', {
  templateRoot: upath.resolve(__dirname, '../templates'),
  promptForDescription: false,
  promptForAuthor: false,
  promptForEmail: false,
  promptForLicense: false,
  
  after: ({packageDir}) => {
    const cd = spawn('cd', packageDir);
    cd.on('close', code => {
      const install = spawn('npm', ['install']);

      install.stdout.on('data', (data) => {
        logUpdate(`${data}`);
      });

      install.on('close', (code) => {
        logUpdate.done();
        execa('npm', ['start']).stdout.pipe(process.stdout);
      });
    });
  },

  caveat: ({ packageDir }) => {
    return `
${chalk.bold.yellowBright("Directus with MySQL, Adminer, and GraphiQL:")}

To configure and run your Directus services, first ${chalk.bold("make sure you have Docker installed and running")}, then run:

${chalk.gray('1.')} cd ${chalk.bold.green(packageDir)}
${chalk.gray('2.')} npm install
${chalk.gray('3.')} npm start

For more information, see: 
https://github.com/davekobrenski/create-directus-docker

Enjoy!
`
  }
});
