import inq from 'inquirer';
import {object as dotObj} from 'dot-object'

import config from '../../lib/config';
import {Origami} from '../../types/origami';
import pkg from '../../lib/package';
import random from '../../lib/random-hex';
import PackageJson from '../../types/package-json';
import { Init } from '../../types/init.answers';
import defaultData from "./defaultData";
import _ from 'lodash';

/**
 * Validates a prompt to ensure there is a value
 * @param v Value passed
 */
const required = (v: string) => {
    if (!v) return 'This field is required';
    else return true;
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
const listOther = (p: PackageJson, name: string, message: string, def: string): Array<inq.Question> => {

    // Regex to extract value from dependencies
    const r: RegExp = new RegExp(`origami-${name}-(.*)`);

    // Filter out the packages that are needed
    const data: Array<Object> = Object.keys(p.dependencies)
        .filter(k => r.test(k))
        .map((k: string) => r.exec(k)![1]);


    // Return a
    return [
        {
            type: 'list',
            choices: _.uniq([...data, ...defaultData[name], 'Other']),
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

    const p: PackageJson = (await pkg()) || { dependencies: [] };


    let answers: Init.Answers = {};
    answers = {
        ...answers,
        ...await inq.prompt([
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
        ])
    };


    // ------------------------------------------------------------------ Server
    const serverDefault = {
        port: 9999,
        secret: await random()
    };

    // Check if the user wants to use default config for server...
    if ((await inq.prompt({
        type: 'confirm',
        message: 'Use default server config?',
        name: 'default'
    })).default) {

        // Use default
        answers = {
            ...answers,
            ...{ server: serverDefault }
        };

    } else {
        // Otherwise cusotmise...
        answers = {
            ...answers,
            ...await inq.prompt([
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


    // Convert the answer from dot notation
    const file: Origami.Config = dotObj(answers);

    if (file.server.secret === 'Auto-generated secret') {
        file.server.secret = serverDefault.secret;
    }

    file.theme.name = file.theme.type;

    return file;
}
