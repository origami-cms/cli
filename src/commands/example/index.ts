const tmp = require('tmp');
const request = require('request');
const fs = require('fs-extra');
const path = require('path');
const extract = require('extract-zip');
const {Spinner} = require('cli-spinner');

import {Arguments, CommandModule} from 'yargs';


export const command = 'example [example]';
export const description = 'Generate an example Origami app';

export const builder = {
    example: {
        demandOption: 'Example is required',
        description
    }
} as CommandModule['builder'];

const REPO = (repo: string) => `https://api.github.com/repos/origami-cms/example-${repo}/zipball/master`;

export const handler = async(yargs: Arguments) => {
    const ex = yargs.example;
    const time = Date.now();
    const download = () => new Promise((res, rej) => {

        tmp.file(async(err, file, fd, clean) => {
            if (err) return rej(err);

            const headers = {
                'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                'accept-language': 'en-US,en;q=0.8',
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2',
                'accept-encoding': 'gzip,deflate',
            };

            const options = {
                url: REPO(ex),
                headers
            };

            const spinner = new Spinner({
                text: '%s Downloading'
            });
            spinner.setSpinnerString(18);
            spinner.start();

            let ok = true;
            request(options, () => {
                spinner.stop(true);
                if (ok) {
                    console.log(`\nSucessfully generated Origami example '${ex}'`.green);
                    console.log(`Run 'origami' in the '${ex}' directory to start the app\n`.green);
                    console.log(`Completed in ${(Date.now() - time) / 1000} seconds\n`.blue);
                    res(file);
                } else {
                    console.log(`\nOrigami example '${ex}' could not be found`.red);
                    console.log(`Please try another example such as`.red, 'hello-world\n'.yellow);
                    res(false);
                }
            })
                .on('response', r => {
                    if (r.statusCode !== 200) ok = false;
                })
                .pipe(fs.createWriteStream(file));
        });
    });

    const extractRepo = zip => new Promise((res, rej) => {
        tmp.dir(async (err, dir, fd, clean) => {
            if (err) return rej(err);
            await extract(zip, {dir}, async() => {
                const [repo] = fs.readdirSync(dir);
                await fs.copy(path.join(dir, repo), path.join(process.cwd(), ex));
                res();
            });
        });
    });

    const file = await download();
    if (file) await extractRepo(file);
};

