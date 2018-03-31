const {spawn} = require('child_process');
import {config} from 'origami-core-lib';
const origami = require('origami-cms');
import {Arguments} from 'yargs';
import 'colors';

exports.command = 'run';
exports.description = 'Run the Origami app';
exports.handler = async (yargs: Arguments) => {
    let c;
    if (yargs.file) {
        spawn('node', [`./${yargs.file}`], {
            detached: true,
            stdio: 'inherit'
        });
    } else if (c = await config.read()) {
        new origami(c);
    } else {
        console.log(
            'No Origami app found.\n    Try running:'.grey,
            'origami new'.magenta,
            'to create a new app\n    See:'.grey,
            'origami --help'.magenta,
            'for more details'.grey);
    }

};


