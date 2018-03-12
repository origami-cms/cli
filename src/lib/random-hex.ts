import {randomBytes} from 'crypto';

/**
 * Generates a random hex string
 * @param {Number} len Number of characters
 * @return {Promise<string>} Promise that resolves to a hex string
 */
export default (len: Number = 16): Promise<string> =>
    new Promise(res => {
        const SECRET_LENGTH = 16;
        randomBytes(SECRET_LENGTH, (err: Error, r: Buffer) => {
            res(r.toString('hex'));
        });
    });
