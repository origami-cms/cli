"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
/**
 * Generates a random hex string
 * @param {Number} len Number of characters
 * @return {Promise<string>} Promise that resolves to a hex string
 */
exports.default = (len = 16) => new Promise(res => {
    const SECRET_LENGTH = 16;
    crypto_1.randomBytes(SECRET_LENGTH, (err, r) => {
        res(r.toString('hex'));
    });
});
