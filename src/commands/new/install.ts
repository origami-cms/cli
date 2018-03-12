const yarn = require('yarn-programmatic');
import {Origami} from "../../types/origami";
import pkg from "../../lib/package";
import PackageJson from "../../types/package-json";

/**
 * Installs the necessary node modules that are specifed in the config
 * @async
 * @returns {Promise<boolean>} Whether it's safe to continue or not
 */
export default async(config: Origami.Config): Promise<void> => {
    // Find the existing dependencies already installed
    const p: PackageJson = await pkg();
    const existing = p.dependencies || {};

    // Required dependencies for Origami to run
    let dependencies = [
        'origami-cms',
        `origami-store-${config.store.type}`,
        `origami-theme-${config.theme.name}`
    ];

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
}
