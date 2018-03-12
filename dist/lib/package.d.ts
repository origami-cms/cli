import PackageJson from '../types/package-json';
declare const _default: () => Promise<Boolean | PackageJson>;
export default _default;
/**
 * Merge/create the package.json file
 * @param file JSON config for Origami app to override
 */
export declare const write: (file: PackageJson) => Promise<void>;
