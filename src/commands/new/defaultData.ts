import {Origami} from 'origami-core-lib';

export type defaultData = {
    [type in Origami.ModuleType]: string[];
};

export default {
    store: ['mongodb', 'postgres', 'mysql'],
    theme: ['snow']
} as defaultData;
