import {Origami} from 'origami-core-lib';

export type defaultData = {
    [type in Origami.ModuleType]: string[];
};

export default {
    store: ['MongoDB', 'Postgres', 'MySQL', 'Microsoft SQL', 'MariaDB', 'Other', 'None'],
    theme: ['None', 'Snow']
} as defaultData;
