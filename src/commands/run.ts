import 'colors';
// @ts-ignore
import * as opn from 'opn';
import origami from 'origami-cms';
import {config, Origami} from 'origami-core-lib';
import * as path from 'path';
import {Arguments, CommandBuilder} from 'yargs';

export const command = 'run [file]';
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

/**
 * Run Origami with a file or directory (defaults to .origami file from dir),
 * and optionally open the app in the browser.
 */
export const handler = async (yargs: Arguments) => {
    if (yargs.verbose) process.env.LOG_VERBOSE = 'true';

    let c: Origami.Config | false;

    // Allow for default $0 AND run command
    let input = yargs._[0];
    if (input === 'run') input = yargs.file || './';

    c = await config.read(input);

    if (c) {
        let _origami = origami;

        // Attempt to load a local instance of origami-cms in place of the CLI's default version
        try {
            _origami = require(path.resolve(process.cwd(), 'node_modules/origami-cms')).Origami;
        // No local installation
        } catch (e) {}

        // Run Origami
        // @ts-ignore
        new _origami(c as Origami.Config);

        // If there's a server port and the open option, load the app in the browser
        if (c.server.port && yargs.open) {
            setTimeout(() => {
                opn(`http://localhost:${(c as Origami.Config).server.port}/`);
            }, 1000);
        }
        console.log('Origami is now running!'.grey);

    } else {
        console.log(
            'No Origami app found.\n    Try running:'.grey,
            'origami new'.magenta,
            'to create a new app\n    See:'.grey,
            'origami --help'.magenta,
            'for more details'.grey);
    }
};


