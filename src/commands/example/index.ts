const tmp = require('tmp');
const request = require('request');
const fs = require('fs-extra');
const path = require('path');
const extract = require('extract-zip');
// tslint:disable-next-line
const Spinner = require('ora');

import {Response} from 'request';
import {Arguments, CommandModule} from 'yargs';


export const command = 'example [example]';
export const description = 'Generate an example Origami app';

export const builder = {
    example: {
        // demandOption: 'Example is required',
        description
    },
    list: {
        alias: '-l',
        describe: 'List the available examples',
        type: 'boolean'
    }
} as CommandModule['builder'];

const REPO = (repo: string) => `https://api.github.com/repos/origami-cms/example-${repo}/zipball/master`;
const SEARCH_EXAMPLES = 'https://api.github.com/search/repositories?q=origami-cms/origami-example-';
const REQUEST_HEADERS = {
    'accept-language': 'en-US,en;q=0.8',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/537.13+ (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2',
};

export const handler = async(yargs: Arguments) => {
    const ex = yargs.example;
    const time = Date.now();


    if (!ex || yargs.list) {
        const spinner = Spinner('Fetching examples...').start();
        const res = (await new Promise((res, rej) => {
            request({
                url: SEARCH_EXAMPLES,
                headers: REQUEST_HEADERS
            }, (err: string, r: Response) => {
                if (err) rej(err);
                else res(r);
            });
        })) as Response;
        let items: {description: string, name: string}[];
        try {
            items = JSON.parse(res.body).items;
        } catch (e) {
            return console.log('Could not find examples');
        }
        spinner.stop();

        console.log('\nOrigami examples:\n');

        items.forEach(i => {
            console.log(`- ${
                i.name.split('example-').pop()!.yellow
            }\t${
                i.description.magenta
            }`);
        });



    } else {
        const download = (): Promise<boolean | string> => new Promise((res, rej) => {

            tmp.file(async(err: Error, file: string) => {
                if (err) return rej(err);

                const headers = {
                    ...REQUEST_HEADERS,
                    ...{
                        'accept-charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.3',
                        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                        'accept-encoding': 'gzip,deflate'
                    }
                };

                const options = {
                    url: REPO(ex),
                    headers
                };

                const spinner = Spinner('Downloading example '.magenta + ex.yellow);
                spinner.start();

                let ok = true;
                request(options, (err: NodeJS.ErrnoException) => {
                    spinner.stop();

                    if (err) {
                        ok = false;
                        // @ts-ignore This is actually a string
                        if (err.errno === 'ECONNREFUSED') {
                            spinner.fail('Could not connect. Please check your internet connection\n'.red);
                            return;
                        }
                    }

                    if (ok) {
                        spinner.succeed(`Successfully generated Origami example '${ex}'`.green);
                        console.log(`Run 'origami' in the '${ex}' directory to start the app\n`.green);
                        console.log(`Completed in ${(Date.now() - time) / 1000} seconds\n`.blue);
                        res(file);
                    } else {
                        spinner.fail(`Origami example '${ex}' could not be found`.red);
                        console.log(`Please try another example such as`.red, 'hello-world\n'.yellow);
                        res(false);
                    }
                })
                    .on('response', (r: Response) => {
                        // tslint:disable-next-line no-magic-numbers
                        if (r.statusCode !== 200) ok = false;
                    })
                    .pipe(fs.createWriteStream(file));
            });
        });


        const extractRepo = (zip: string) => new Promise((res, rej) => {
            tmp.dir(async (err: Error, dir: string) => {
                if (err) return rej(err);
                await extract(zip, {dir}, async() => {
                    const [repo] = fs.readdirSync(dir);

                    await fs.copy(path.join(dir, repo), path.join(process.cwd(), ex));
                    res();
                });
            });
        });


        const file = await download();

        if (file) await extractRepo(file as string);
    }
};

