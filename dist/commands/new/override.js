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
const inquirer_1 = __importDefault(require("inquirer"));
const origami_core_lib_1 = require("origami-core-lib");
/**
 * Prompts user to override the existing app if there is already a config file
 * present in the current working directory
 * @async
 * @returns {Promise<boolean>} Whether it's safe to continue or not
 */
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    let existing = yield origami_core_lib_1.config.read();
    if (!existing)
        return true;
    existing = existing;
    return (yield inquirer_1.default.prompt({
        type: 'confirm',
        message: `Override existing app ${(existing.app.name || '').red}?`,
        name: 'override',
        default: false
    })).override;
});
