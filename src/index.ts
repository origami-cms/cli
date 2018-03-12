#!/usr/bin/env node
import argv = require('yargs');
require('colors');


argv.commandDir('./commands', {
    recurse: true
});
argv.argv; // eslint-disable-line

