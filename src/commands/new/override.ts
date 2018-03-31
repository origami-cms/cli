import inq from 'inquirer';
import {config} from 'origami-core-lib';
import {Origami} from 'origami-cms';

/**
 * Prompts user to override the existing app if there is already a config file
 * present in the current working directory
 * @async
 * @returns {Promise<boolean>} Whether it's safe to continue or not
 */
export default async(): Promise<boolean> => {
    let existing = await config.read();
    if (!existing) return true;

    existing = existing as Origami.Config;

    interface result {
        override: boolean;
    }

    return (await inq.prompt({
        type: 'confirm',
        message: `Override existing app ${(existing.app.name || '').red}?`,
        name: 'override',
        default: false
    }) as result).override;
};
