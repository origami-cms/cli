const {spawn} = require('child_process');
import {config, Origami} from 'origami-core-lib';
import origami from 'origami-cms';
import {Arguments, CommandBuilder} from 'yargs';
import 'colors';
import * as path from 'path';
import {exec} from 'child_process';

export const command = 'run';
export const description = 'Run the Origami app';
export const builder: CommandBuilder = {
    verbose: {
        alias: 'v',
        describe: 'Verbose logging',
        type: 'boolean',
        default: false
    },
    open: {
        alias: 'o',
        describe: 'Open the app in the browser',
        type: 'boolean',
        default: false
    }
};

export const handler = async (yargs: Arguments) => {
    if (yargs.verbose) process.env.LOG_VERBOSE = 'true';

    let c;
    if (yargs.file) {
        spawn('node', [`./${yargs.file}`], {
            detached: true,
            stdio: 'inherit'
        });
    } else if (c = await config.read()) {
        let _origami = origami;

        // Attempt to load origami with the local version of the module
        try {
            _origami = require(path.resolve(process.cwd(), 'node_modules/origami-cms')).Origami;

        // No local installation
        } catch (e) {}

        new _origami(c as Origami.Config);

        if (c.server.port && yargs.open) {
            setTimeout(() => {
                exec(`open http://localhost:${c.server.port}/`);
            }, 1000);
        }

    } else {
        console.log(
            'No Origami app found.\n    Try running:'.grey,
            'origami new'.magenta,
            'to create a new app\n    See:'.grey,
            'origami --help'.magenta,
            'for more details'.grey);
    }

};


