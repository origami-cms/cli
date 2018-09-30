// @ts-ignore
const getLatest = require('latest-version');
import {gt} from 'semver';
import bannerLog from './bannerLog';

export default async(skipLog: boolean = false) => {
    const {version: current, name} = require('../../package.json');
    const latest = await getLatest(name);

    if (gt(latest, current)) {
        if (!skipLog) {
            bannerLog(
                `⬆  A new version of Origami CLI (${latest}) is available. ⬆`,
                'green'
            );
        }
        return false;
    } else return true;
};
