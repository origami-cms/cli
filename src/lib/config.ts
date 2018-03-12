import {readFile, writeFile} from 'fs';
import {promisify} from 'util';
import * as path from 'path';
import {Origami} from '../types/origami';

const fsReadFile = promisify(readFile);
const fsWriteFile = promisify(writeFile);

const CONFIG_FILE = (): string => path.resolve(process.env.CLI_CWD || './', '.origami');

/**
 * Attempt to load the .origami file at the current directory
 * @returns {Object|Boolean} The Origami file as json, or false if it cannot be
 * found or loaded correctly
*/
export default async(): Promise<Object|Boolean> => {
    try {
        return JSON.parse(
            (await fsReadFile(CONFIG_FILE())).toString()
        );
    } catch (e) {
        return false;
    }
};

/**
 * Override/write the .origami file
 * @param file JSON config for Origami app to override
 */
export const write = async(file: Origami.Config): Promise<void> => {
    return fsWriteFile(
        CONFIG_FILE(),
        JSON.stringify(file, null, 4)
    );
}
