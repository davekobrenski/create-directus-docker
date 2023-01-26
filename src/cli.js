#!/usr/bin/env node

import upath from 'upath';
import chalk from 'chalk';
import path from 'path';
import { fileURLToPath } from 'url';
import logUpdate from 'log-update';
import fs from 'fs-extra';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const templateDir = upath.resolve(__dirname, '../templates/default');

const rootPath = path.resolve();

const argv = yargs(hideBin(process.argv)).argv;
const args = argv._;

//check enough args
if (args.length > 0) {
  const packageDir = args[0];

  const successMsg = `
${chalk.bold.yellowBright("Directus with MySQL, Adminer, and GraphiQL:")}

To configure and run your Directus services, first ${chalk.bold("make sure you have Docker installed and running")}, then run:

${chalk.gray('1.')} cd ${chalk.bold.green(packageDir)}
${chalk.gray('2.')} npm install
${chalk.gray('3.')} npm start

For more information, see: 
https://github.com/davekobrenski/create-directus-docker

Enjoy!
`;
  console.log("");
  logUpdate(`Creating directory: ${packageDir}...`);
  const dirFullPath = path.join(rootPath, packageDir);

  //make the dir for the project
  if (fs.existsSync(dirFullPath) === false) {
    fs.mkdir(path.join(rootPath, packageDir)).then(() => {
      //success
      logUpdate(chalk.greenBright(`Directory '${packageDir}' created successfully.`));
      logUpdate.done();

      try {
        fs.copySync(templateDir, dirFullPath);
        logUpdate(successMsg);
      } catch (err) {
        console.error(err);
      } 
    }).catch(err => console.error(err));
  } else {
    console.error(chalk.redBright(`Error: Specified directory '${packageDir}' already exists.`));
  }
} else {
  console.error(chalk.redBright(`Error: please specify a project directory.`));
}