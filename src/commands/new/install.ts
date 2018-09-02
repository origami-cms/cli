const yarn = require('yarn-programmatic');
import {Origami, PackageJson, pkgjson} from 'origami-core-lib';

/**
 * Installs the necessary node modules that are specified in the config
 * @async
 * @returns {Promise<boolean>} Whether it's safe to continue or not
 */
export default async (config: Origami.Config): Promise<void> => {
    // Find the existing dependencies already installed
    const _p = await pkgjson.read();

    if (!_p) throw new Error('Could not find package.json');
    const p = _p as PackageJson;

    const existing = p.dependencies || {};

    // Required dependencies for Origami to run
    let dependencies = ['origami-cms'];

    if (config.store && config.store.type) {
        dependencies.push(
            `origami-store-${config.store.type}`
        );
    }

    // Filter with what's currently installed
    dependencies = dependencies.filter(d => !existing[d]);

    if (!dependencies.length) {
        console.log('No dependencies to install');
        return;
    }

    // Install the rest
    console.log(`Installing ${dependencies.length} package${dependencies.length > 1 ? 's' : ''}...`);
    try {
        await yarn.add(dependencies, {
            cwd: process.env.CLI_CWD
        });
        console.log('Done!'.green);
    } catch (e) {
        console.log(e.message.red);
    }
};
