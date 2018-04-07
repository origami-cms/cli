import {Origami, PackageJson, pkgjson} from 'origami-core-lib';

/**
 * Creates a basic package.json file if it doesn't already exist
 * @param c Origami config file as json
 * @returns {Promise} When finished writing file
 */
export default async (c: Origami.Config): Promise<void> => {
    if (await pkgjson.read()) Promise.resolve(true);

    const p: PackageJson = {
        name: c.app.name.replace(/\s/g, '-').toLowerCase(),
        dependencies: {},
        scripts: {}
    };

    return pkgjson.write(p);
};
