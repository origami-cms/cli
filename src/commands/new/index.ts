const path = require('path');
const bird = require('origami-bird');

import {config, Origami} from 'origami-core-lib';
import {Arguments, CommandModule} from 'yargs';
import initDirectory from './initDirectory';
import initPackage from './initPackage';
import install from './install';
import override from './override';
import prompt from './prompt';


export const command = 'new [directory]';
export const description = 'Initialize a new Origami app';

export const builder = {
    directory: {
        default: './',
        alias: 'd',
        description: 'Directory to initialize the new app'
    }
} as CommandModule['builder'];

export const handler = async(yargs: Arguments) => {
    const t = Date.now();


    process.env.CLI_CWD = path.resolve(yargs.directory);


    // Display the Origami bird
    bird();

    // If there is a config, confirm the user wants to override the existing app
    if (!(await override())) return;
    // Otherwise make the directory if it doesn't exist
    await initDirectory();

    // Prompt the user through a wizard to get the details for the origami file
    const c: Origami.Config = await prompt();

    // Update the package.json and write the .origami file
    await config.write(c);
    await initPackage(c);


    // Install the dependencies that are yet to be installed
    await install(c);

    // TODO: Init database
    console.log(`Setup completed in ${(Date.now() - t) / 1000}s`.green);
};
