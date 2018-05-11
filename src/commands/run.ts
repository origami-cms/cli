const {spawn} = require('child_process');
import {config, Origami} from 'origami-core-lib';
import origami from 'origami-cms';
import {Arguments} from 'yargs';
import 'colors';
import * as path from 'path';

export const command = 'run';
export const description = 'Run the Origami app';
export const handler = async (yargs: Arguments) => {
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

    } else {
        console.log(
            'No Origami app found.\n    Try running:'.grey,
            'origami new'.magenta,
            'to create a new app\n    See:'.grey,
            'origami --help'.magenta,
            'for more details'.grey);
    }

};


