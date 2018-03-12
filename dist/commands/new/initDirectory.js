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
const mkdirp_1 = __importDefault(require("mkdirp"));
const util_1 = require("util");
const fsStat = util_1.promisify(fs_1.stat);
const mk = util_1.promisify(mkdirp_1.default);
/**
 * Creates the directory to the process.env.CLI_CWD if it doesn't exist
 * @returns {Promise} When finished making the directory
 */
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const cwd = process.env.CLI_CWD;
    if (!cwd)
        return Promise.resolve();
    // Check if cwd exists
    try {
        (yield fsStat(cwd)).isDirectory();
        return Promise.resolve();
    }
    // Otherwise create it
    catch (e) {
        return mk(cwd);
    }
});
