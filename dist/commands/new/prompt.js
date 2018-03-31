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
const dot_object_1 = require("dot-object");
const origami_core_lib_1 = require("origami-core-lib");
const defaultData_1 = __importDefault(require("./defaultData"));
const lodash_1 = __importDefault(require("lodash"));
/**
 * Validates a prompt to ensure there is a value
 * @param v Value passed
 */
const required = (v) => {
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
const listOther = (p, name, message, def) => {
    // Regex to extract value from dependencies
    const r = new RegExp(`origami-${name}-(.*)`);
    let data = [];
    // Filter out the packages that are needed
    if (p.dependencies) {
        data = Object.keys(p.dependencies)
            .filter(k => r.test(k))
            .map((k) => r.exec(k)[1]);
    }
    // Return a
    return [
        {
            type: 'list',
            choices: lodash_1.default.uniq([...data, ...defaultData_1.default[name], 'Other']),
            name: `${name}.type`,
            default: data[0] || def,
            message
        }, {
            name: `${name}.type`,
            when: (opts) => opts[name].type === 'Other',
            validate: required,
            message
        }
    ];
};
/**
 * Prompts user for the information to create the .origami file with
 * @async
 * @returns {Promise<Origami.Config>} Origami settings object
 */
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const _p = yield origami_core_lib_1.pkgjson.read();
    const p = _p ? _p : { dependencies: {} };
    let answers = {};
    answers = Object.assign({}, answers, yield inquirer_1.default.prompt([
        // ------------------------------------------------------------- App
        {
            name: 'app.name',
            default: p.name || 'Origami Site',
            message: 'App/site name'
        },
        // ----------------------------------------------------------- Store
        ...listOther(p, 'store', 'Store (Database) type', 'mongodb'),
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
        },
        // ----------------------------------------------------------- Theme
        ...listOther(p, 'theme', 'Theme', 'snow')
    ]));
    // ------------------------------------------------------------------ Server
    const serverDefault = {
        port: 9999,
        secret: yield origami_core_lib_1.random()
    };
    // Check if the user wants to use default config for server...
    if ((yield inquirer_1.default.prompt({
        type: 'confirm',
        message: 'Use default server config?',
        name: 'default'
    })).default) {
        // Use default
        answers = Object.assign({}, answers, { server: serverDefault });
    }
    else {
        // Otherwise cusotmise...
        answers = Object.assign({}, answers, yield inquirer_1.default.prompt([
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
        ]));
    }
    // Convert the answer from dot notation
    dot_object_1.object(answers);
    // @ts-ignore This is modifed by the dotObj
    const file = answers;
    if (file.server.secret === 'Auto-generated secret') {
        file.server.secret = serverDefault.secret;
    }
    file.theme.name = file.theme.type;
    delete file.theme.type;
    return file;
});
