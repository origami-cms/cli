const fs = require('fs');
const path = require('path');
const {promisify} = require('util');
const bird = require('origami-bird');
const inq = require('inquirer');


import {Arguments, CommandModule} from 'yargs';
import override from './override';
import initDirectory from './initDirectory';
import prompt from './prompt';
import {write as writeConfig} from '../../lib/config';
import initPackage from './initPackage';
import install from './install';
import {Origami} from '../../types/origami';


export const command = 'new [directory]';
export const description = 'Initialize a new Origami app';

export const builder: CommandModule["builder"] = {
    directory: {
        default: './',
        alias: 'd',
        description: 'Directory to initialize the new app'
    }
}

export const handler = async(yargs: Arguments) => {
    const t = Date.now();


    process.env.CLI_CWD = path.resolve(yargs.directory);


    // Display the Origami bird
    bird();

    // If there is a config, confirm the user wants to override the existing app
    if (!(await override())) return;
    // Otherwise make the directory if it doesn't exist
    else await initDirectory();

    // Prompt the user through a wizard to get the details for the origami file
    const config: Origami.Config = await prompt();

    // Update the package.json and write the .origami file
    await writeConfig(config);
    await initPackage(config);

    // Install the dependencies that are yet to be installed
    await install(config);

    // TODO: Init database
    console.log(`Setup completed in ${(Date.now() - t) / 1000}s`.green);
};
