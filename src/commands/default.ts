import {CommandBuilder} from 'yargs';


const {handler: run, builder: runBuilder} = require('./run');


export const command = '$0';
export const description = 'Run the Origami app';
export const builder: CommandBuilder = runBuilder;
export const handler = run;
