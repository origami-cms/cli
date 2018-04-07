#!/usr/bin/env node
const argv = require('yargs');
require('colors');


argv.commandDir('./commands', {
    recurse: true
});
argv.argv;

