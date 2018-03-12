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
}
Object.defineProperty(exports, "__esModule", { value: true });
const { spawn } = require('child_process');
const config_1 = __importDefault(require("../lib/config"));
const origami = require('origami-cms');
exports.command = 'run';
exports.description = 'Run the Origami app';
exports.handler = (yargs) => __awaiter(this, void 0, void 0, function* () {
    let c;
    if (yargs.file)
        spawn('node', [`./${yargs.file}`], {
            detached: true,
            stdio: 'inherit'
        });
    else if (c = yield config_1.default()) {
        new origami(c);
    }
    else {
        console.log('No Origami app found.\n    Try running:'.grey, 'origami new'.magenta, 'to create a new app\n    See:'.grey, 'origami --help'.magenta, 'for more details'.grey);
    }
});
