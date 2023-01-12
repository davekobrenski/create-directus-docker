#!/usr/bin/env node

import upath from 'upath';
import chalk from 'chalk';
import path from 'path';
import {fileURLToPath} from 'url';
import { create } from 'create-create-app';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

create('create-directus-docker', {
  templateRoot: upath.resolve(__dirname, '../templates'),
  caveat: ({ packageDir }) => {
    return `
${chalk.bold.yellowBright("Directus with MySQL, Adminer, and GraphiQL:")}

To configure and run your Directus services, run:

${chalk.gray('1.')} cd ${chalk.bold.green(packageDir)}
${chalk.gray('2.')} npm install
${chalk.gray('3.')} npm start

For more information, see: 
https://github.com/davekobrenski/create-directus-docker

Enjoy!
`
  }
});
