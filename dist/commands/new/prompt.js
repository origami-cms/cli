"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var INQ = require('inquirer');
var dot_object_1 = require("dot-object");
var origami_core_lib_1 = require("origami-core-lib");
var defaultData_1 = require("./defaultData");
var _ = require("lodash");
/**
 * Validates a prompt to ensure there is a value
 * @param v Value passed
 */
var required = function (v) {
    if (!v)
        return 'This field is required';
    return true;
};
/**
 * Extracts modules out of the package.json file in the format of:
 * 'origami-{{name}}-x' and converts them into Inquirer questions.
 * @param {Object: PackageJson} p Package.json file as json
 * @param {String} name type of module to extract from package.json
 * @param {String} message Prompt for Inquirer
 * @param {String} def Default value
 * @returns {Array<Object>} Two Inquierer questions for selecting a value
 */
var listOther = function (p, name, message, def) {
    // Regex to extract value from dependencies
    var r = new RegExp("origami-" + name + "-(.*)");
    var data = [];
    // Filter out the packages that are needed
    if (p.dependencies) {
        data = Object.keys(p.dependencies)
            .filter(function (k) { return r.test(k); })
            .map(function (k) { return r.exec(k)[1]; });
    }
    console.log(defaultData_1.default[name], name, defaultData_1.default);
    // Return a
    return [
        {
            type: 'list',
            choices: _.uniq(data.concat(defaultData_1.default[name], ['Other']).filter(function (v) { return v; })),
            name: name + ".type",
            default: data[0] || def,
            message: message
        }, {
            name: name + ".type",
            when: function (opts) { return opts[name].type === 'Other'; },
            validate: required,
            message: message
        }
    ];
};
/**
 * Prompts user for the information to create the .origami file with
 * @async
 * @returns {Promise<Origami.Config>} Origami settings object
 */
exports.default = (function () { return __awaiter(_this, void 0, void 0, function () {
    var _p, p, answers, _a, serverDefault, _b, _c, file;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0: return [4 /*yield*/, origami_core_lib_1.pkgjson.read()];
            case 1:
                _p = _d.sent();
                p = _p ? _p : { dependencies: {} };
                answers = {};
                _a = [{}, answers];
                return [4 /*yield*/, INQ.prompt([
                        // ------------------------------------------------------------- App
                        {
                            name: 'app.name',
                            default: p.name || 'Origami Site',
                            message: 'App/site name'
                        }
                    ].concat(listOther(p, 'store', 'Store (Database) type', 'mongodb'), [
                        {
                            name: 'store.host',
                            message: 'Store host',
                            default: 'localhost',
                            validate: required
                        },
                        {
                            name: 'store.port',
                            message: 'Store port',
                            default: '27017',
                            validate: required
                        },
                        {
                            name: 'store.database',
                            message: 'Store database',
                            default: 'origami-app',
                            validate: required
                        },
                        {
                            name: 'store.username',
                            message: 'Store username',
                            default: 'origami',
                            validate: required
                        },
                        {
                            type: 'password',
                            name: 'store.password',
                            message: 'Store password',
                            validate: required
                        }
                    ], listOther(p, 'theme', 'Theme', 'snow')))];
            case 2:
                answers = __assign.apply(void 0, _a.concat([_d.sent()]));
                _b = {
                    port: 9999
                };
                return [4 /*yield*/, origami_core_lib_1.random()];
            case 3:
                serverDefault = (_b.secret = _d.sent(),
                    _b);
                return [4 /*yield*/, INQ.prompt({
                        type: 'confirm',
                        message: 'Use default server config?',
                        name: 'default'
                    })];
            case 4:
                if (!(_d.sent()).default) return [3 /*break*/, 5];
                // Use default
                answers = __assign({}, answers, { server: serverDefault });
                return [3 /*break*/, 7];
            case 5:
                _c = [{}, answers];
                return [4 /*yield*/, INQ.prompt([
                        {
                            message: 'Server port',
                            default: serverDefault.port,
                            name: 'server.port',
                            validate: required
                        },
                        {
                            message: 'Server secret',
                            default: 'Auto-generated secret',
                            name: 'server.secret'
                        }
                    ])];
            case 6:
                // Otherwise cusotmize...
                answers = __assign.apply(void 0, _c.concat([_d.sent()]));
                _d.label = 7;
            case 7:
                // Convert the answer from dot notation
                dot_object_1.object(answers);
                file = answers;
                if (file.server.secret === 'Auto-generated secret') {
                    file.server.secret = serverDefault.secret;
                }
                file.theme.name = file.theme.type;
                delete file.theme.type;
                return [2 /*return*/, file];
        }
    });
}); });
