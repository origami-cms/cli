import {CommandBuilder} from 'yargs';

const fs = require('fs');
const {promisify} = require('util');
const path = require('path');
const fsStat = promisify(fs.stat);


const {handler: run} = require('./run');


export const command = '$0';
export const description = 'Run the Origami app';
export const builder: CommandBuilder = {
    verbose: {
        alias: 'v',
        describe: 'Verbose logging',
        type: 'boolean',
        default: false
    }
};
export const handler =  async(yargs: Object) => {
    run(yargs);
};
