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
const fs_1 = require("fs");
const util_1 = require("util");
const path = require("path");
const fsReadFile = util_1.promisify(fs_1.readFile);
const fsWriteFile = util_1.promisify(fs_1.writeFile);
const deepmerge_1 = __importDefault(require("deepmerge"));
const PKG_FILE = () => path.resolve(process.env.CLI_CWD || './', 'package.json');
/**
 * Attempt to load the package.json at the current directory
 * @returns {NPM.Static|Boolean} The package as json, or false if it cannot be found
 * or loaded correctly
*/
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    try {
        return require(PKG_FILE());
    }
    catch (e) {
        return false;
    }
});
/**
 * Merge/create the package.json file
 * @param file JSON config for Origami app to override
 */
exports.write = (file) => __awaiter(this, void 0, void 0, function* () {
    let existing = {};
    try {
        existing = require(PKG_FILE());
    }
    catch (e) {
        // No existing package.json file
    }
    return fsWriteFile(PKG_FILE(), JSON.stringify(deepmerge_1.default(existing, file), null, 4));
});
