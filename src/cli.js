#!/usr/bin/env node

import upath from 'upath';
import chalk from 'chalk';
import path from 'path';
import {fileURLToPath} from 'url';
import { resolve } from 'path';
import { create } from 'create-create-app';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// let templateRoot = resolve(__dirname, '../templates');
const templateRoot = upath.resolve(__dirname, '../templates')

console.log(chalk.redBright("DEBUG:"));
console.log(__filename);
console.log(__dirname)
console.log(templateRoot);
console.log(chalk.redBright("END DEBUG"));
//${chalk.yellow("Directus with MySQL, Adminer, and GraphiQL:")}

const caveat = `
Installed successfully.
`;

create('create-directus-docker', {
  templateRoot: upath.resolve(__dirname, '../templates')
});
