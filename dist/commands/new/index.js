"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var path = require('path');
var promisify = require('util').promisify;
var bird = require('origami-bird');
var inq = require('inquirer');
var override_1 = require("./override");
var initDirectory_1 = require("./initDirectory");
var prompt_1 = require("./prompt");
var origami_core_lib_1 = require("origami-core-lib");
var initPackage_1 = require("./initPackage");
var install_1 = require("./install");
exports.command = 'new [directory]';
exports.description = 'Initialize a new Origami app';
exports.builder = {
    directory: {
        default: './',
        alias: 'd',
        description: 'Directory to initialize the new app'
    }
};
exports.handler = function (yargs) { return __awaiter(_this, void 0, void 0, function () {
    var t, c;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                t = Date.now();
                process.env.CLI_CWD = path.resolve(yargs.directory);
                // Display the Origami bird
                bird();
                return [4 /*yield*/, override_1.default()];
            case 1:
                // If there is a config, confirm the user wants to override the existing app
                if (!(_a.sent()))
                    return [2 /*return*/];
                // Otherwise make the directory if it doesn't exist
                return [4 /*yield*/, initDirectory_1.default()];
            case 2:
                // Otherwise make the directory if it doesn't exist
                _a.sent();
                return [4 /*yield*/, prompt_1.default()];
            case 3:
                c = _a.sent();
                // Update the package.json and write the .origami file
                return [4 /*yield*/, origami_core_lib_1.config.write(c)];
            case 4:
                // Update the package.json and write the .origami file
                _a.sent();
                return [4 /*yield*/, initPackage_1.default(c)];
            case 5:
                _a.sent();
                // Install the dependencies that are yet to be installed
                return [4 /*yield*/, install_1.default(c)];
            case 6:
                // Install the dependencies that are yet to be installed
                _a.sent();
                // TODO: Init database
                console.log(("Setup completed in " + (Date.now() - t) / 1000 + "s").green);
                return [2 /*return*/];
        }
    });
}); };
