"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const bird = require('origami-bird');
const inq = require('inquirer');
const override_1 = __importDefault(require("./override"));
const initDirectory_1 = __importDefault(require("./initDirectory"));
const prompt_1 = __importDefault(require("./prompt"));
const origami_core_lib_1 = require("origami-core-lib");
const initPackage_1 = __importDefault(require("./initPackage"));
const install_1 = __importDefault(require("./install"));
exports.command = 'new [directory]';
exports.description = 'Initialize a new Origami app';
exports.builder = {
    directory: {
        default: './',
        alias: 'd',
        description: 'Directory to initialize the new app'
    }
};
exports.handler = (yargs) => __awaiter(this, void 0, void 0, function* () {
    const t = Date.now();
    process.env.CLI_CWD = path.resolve(yargs.directory);
    // Display the Origami bird
    bird();
    // If there is a config, confirm the user wants to override the existing app
    if (!(yield override_1.default()))
        return;
    // Otherwise make the directory if it doesn't exist
    yield initDirectory_1.default();
    // Prompt the user through a wizard to get the details for the origami file
    const c = yield prompt_1.default();
    // Update the package.json and write the .origami file
    yield origami_core_lib_1.config.write(c);
    yield initPackage_1.default(c);
    // Install the dependencies that are yet to be installed
    yield install_1.default(c);
    // TODO: Init database
    console.log(`Setup completed in ${(Date.now() - t) / 1000}s`.green);
});
