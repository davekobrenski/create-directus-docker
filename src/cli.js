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
  caveat: ({ answers }) => {
    return `
{chalk.yellow("Directus with MySQL, Adminer, and GraphiQL:")}

To configure and run your Directus services, run:

cd ${chalk.bold.green(answers.name)} && npm start

For more information, see: 
https://github.com/davekobrenski/create-directus-docker

Enjoy!
`
  }
});
