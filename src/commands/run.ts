const {spawn} = require('child_process');
import {config, Origami} from 'origami-core-lib';
import origami from 'origami-cms';
import {Arguments} from 'yargs';
import 'colors';

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
        new origami(c as Origami.Config);
    } else {
        console.log(
            'No Origami app found.\n    Try running:'.grey,
            'origami new'.magenta,
            'to create a new app\n    See:'.grey,
            'origami --help'.magenta,
            'for more details'.grey);
    }

};


