import pkg, { write } from "../../lib/package";
import {Origami} from "../../types/origami";
import PackageJson from "../../types/package-json";

/**
 * Creates a basic package.json file if it doesn't already exist
 * @param c Origami config file as json
 * @returns {Promise} When finished writing file
 */
export default async (c: Origami.Config): Promise<void> => {
    if (await pkg()) Promise.resolve(true);

    const p: PackageJson = {
        name: c.app.name.replace(/\s/g, '-').toLowerCase(),
        dependencies: {},
        scripts: {}
    }

    return write(p);
};
