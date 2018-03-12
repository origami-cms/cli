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
const yarn = require('yarn-programmatic');
const package_1 = __importDefault(require("../../lib/package"));
/**
 * Installs the necessary node modules that are specifed in the config
 * @async
 * @returns {Promise<boolean>} Whether it's safe to continue or not
 */
exports.default = (config) => __awaiter(this, void 0, void 0, function* () {
    // Find the existing dependencies already installed
    const p = yield package_1.default();
    const existing = p.dependencies || {};
    // Required dependencies for Origami to run
    let dependencies = [
        'origami-cms',
        `origami-store-${config.store.type}`,
        `origami-theme-${config.theme.name}`
    ];
    // Filter with what's currently installed
    dependencies = dependencies.filter(d => !existing[d]);
    if (!dependencies.length) {
        console.log('No dependencies to install');
        return;
    }
    // Install the rest
    console.log(`Installing ${dependencies.length} package${dependencies.length > 1 ? 's' : ''}...`);
    try {
        yield yarn.add(dependencies, {
            cwd: process.env.CLI_CWD
        });
        console.log('Done!'.green);
    }
    catch (e) {
        console.log(e.message.red);
    }
});
