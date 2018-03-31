import {Origami} from 'origami-cms';


export type defaultData = {
    [type in Origami.PackageType]: string[];
};

export default {
    store: ['mongodb', 'postgres', 'mysql'],
    theme: ['snow']
} as defaultData;
