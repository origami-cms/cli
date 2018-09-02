import inq from 'inquirer';
const INQ = require('inquirer');
import {object as dotObj} from 'dot-object';

import {Origami, PackageJson, config, pkgjson, random} from 'origami-core-lib';
import defaultData from './defaultData';
import * as _ from 'lodash';


export interface Answers {
    theme?: {
        type: string
    };
    store?: {
        type: string
    };
    server?: {
        secret: string
        port: string | number
    };

}


/**
 * Validates a prompt to ensure there is a value
 * @param v Value passed
 */
const required = (v: string) => {
    if (!v) return 'This field is required';
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
const listOther = (p: PackageJson, name: Origami.ModuleType, message: string, def: string): inq.Question[] => {

    // Regex to extract value from dependencies
    const r: RegExp = new RegExp(`origami-${name}-(.*)`);

    let data: Object[] = [];

    // Filter out the packages that are needed
    if (p.dependencies) {
        data = Object.keys(p.dependencies)
            .filter(k => r.test(k))
            .map((k: string) => r.exec(k)![1]);
    }


    // Return a
    return [
        {
            type: 'list',
            choices: _.uniq([...data, ...defaultData[name], 'Other'].filter(v => v)),
            name: `${name}.type`,
            default: data[0] || def,
            message
        }, {
            name: `${name}.type`,
            when: (opts: inq.Answers) => opts[name].type === 'Other',
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
export default async(): Promise<Origami.Config> => {

    const _p = await pkgjson.read();
    const p: PackageJson = _p ? _p as PackageJson : {dependencies: {}};

    const when = (key: string) =>
        (response: any) => response && response[key].type !== 'None';


    let answers: Answers = {};
    answers = {
        ...answers,
        ...await INQ.prompt([
            // ------------------------------------------------------------- App
            {
                name: 'app.name',
                default: p.name || 'Origami Site',
                message: 'App/site name'
            },

            // ----------------------------------------------------------- Store
            ...listOther(p, 'store', 'Store (Database) type', 'mongodb'),
            {
                when: when('store'),
                name: 'store.host',
                message: 'Store host',
                default: 'localhost',
                validate: required
            },
            {
                when: when('store'),
                name: 'store.port',
                message: 'Store port',
                default: '27017',
                validate: required
            },
            {
                when: when('store'),
                name: 'store.database',
                message: 'Store database',
                default: 'origami-app',
                validate: required
            },
            {
                when: when('store'),
                name: 'store.username',
                message: 'Store username',
                default: 'origami',
                validate: required
            },
            {
                when: when('store'),
                type: 'password',
                name: 'store.password',
                message: 'Store password',
                validate: required
            },

            // ----------------------------------------------------------- Theme
            // ...listOther(p, 'theme', 'Theme', 'snow')
        ])
    };


    // ------------------------------------------------------------------ Server
    const serverDefault = {
        port: 9999,
        secret: await random()
    };

    interface result {
        default: boolean;
    }

    // Check if the user wants to use default config for server...
    if ((await INQ.prompt({
        type: 'confirm',
        message: 'Use default server config?',
        name: 'default'
    }) as result).default) {

        // Use default
        answers = {
            ...answers,
            ...{server: serverDefault}
        };


    } else {
        // Otherwise cusotmize...
        answers = {
            ...answers,
            ...await INQ.prompt([
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
            ])
        };
    }


    // If no store is selected, don't install it
    if (answers.store && answers.store.type === 'None') delete answers.store;


    // Convert the answer from dot notation
    dotObj(answers);

    // Temp interface so the theme.type can be converted
    interface TempConfig extends Origami.Config {
        theme: {
            type: string,
            name: string
        };
    }

    // @ts-ignore This is modified by the dotObj
    const file = answers as TempConfig;


    if (file.server.secret === 'Auto-generated secret') {
        file.server.secret = serverDefault.secret;
    }

    // file.theme.name = file.theme.type;
    // delete file.theme.type;

    return file as Origami.Config;
};
