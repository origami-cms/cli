import { Origami } from '../types/origami';
declare const _default: () => Promise<Object | Boolean>;
export default _default;
/**
 * Override/write the .origami file
 * @param file JSON config for Origami app to override
 */
export declare const write: (file: Origami.Config) => Promise<void>;
