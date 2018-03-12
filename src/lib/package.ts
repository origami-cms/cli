import {readFile, writeFile} from 'fs';
import {promisify} from 'util';
import path = require('path');
const fsReadFile = promisify(readFile);
const fsWriteFile = promisify(writeFile);
import PackageJson from '../types/package-json';
import deepmerge from 'deepmerge';


const PKG_FILE = (): string => path.resolve(process.env.CLI_CWD || './', 'package.json');

/**
 * Attempt to load the package.json at the current directory
 * @returns {NPM.Static|Boolean} The package as json, or false if it cannot be found
 * or loaded correctly
*/
export default async (): Promise<PackageJson|Boolean> => {
    try {
        return require(PKG_FILE());
    } catch (e) {
        return false;
    }
};


/**
 * Merge/create the package.json file
 * @param file JSON config for Origami app to override
 */
export const write = async (file: PackageJson): Promise<void> => {
    let existing = {};
    try {
        existing = require(PKG_FILE());
    } catch (e) {
        // No existing package.json file
    }

    return fsWriteFile(
        PKG_FILE(),
        JSON.stringify(
            deepmerge(existing, file),
            null, 4
        )
    );
}
