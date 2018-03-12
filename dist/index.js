#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const argv = require("yargs");
require('colors');
argv.commandDir('./commands', {
    recurse: true
});
argv.argv; // eslint-disable-line
