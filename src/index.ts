#!/usr/bin/env node
const argv = require('yargs');
require('colors');

import versionCheck from './lib/versionCheck';

(async() => {
    await versionCheck();

    argv.commandDir('./commands', {
        recurse: true
    });
    argv.argv;
})();

