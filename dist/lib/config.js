"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
}
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const util_1 = require("util");
const path = __importStar(require("path"));
const fsReadFile = util_1.promisify(fs_1.readFile);
const fsWriteFile = util_1.promisify(fs_1.writeFile);
const CONFIG_FILE = () => path.resolve(process.env.CLI_CWD || './', '.origami');
/**
 * Attempt to load the .origami file at the current directory
 * @returns {Object|Boolean} The Origami file as json, or false if it cannot be
 * found or loaded correctly
*/
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    try {
        return JSON.parse((yield fsReadFile(CONFIG_FILE())).toString());
    }
    catch (e) {
        return false;
    }
});
/**
 * Override/write the .origami file
 * @param file JSON config for Origami app to override
 */
exports.write = (file) => __awaiter(this, void 0, void 0, function* () {
    return fsWriteFile(CONFIG_FILE(), JSON.stringify(file, null, 4));
});
