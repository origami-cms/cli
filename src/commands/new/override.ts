import inq from 'inquirer';
import config from '../../lib/config';
import {Origami} from '../../types/origami';

/**
 * Prompts user to override the existing app if there is already a config file
 * present in the current working directory
 * @async
 * @returns {Promise<boolean>} Whether it's safe to continue or not
 */
export default async(): Promise<boolean> => {
    const existing: Origami.Config = await config();
    if (existing) {
        return (await inq.prompt({
            type: 'confirm',
            message: `Override existing app ${(existing.app.name || '').red}?`,
            name: 'override',
            default: false
        })).override;
    }

    return true;
}
