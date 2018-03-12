"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const package_1 = __importDefault(require("../../lib/package"));
/**
 * Creates a basic package.json file if it doesn't already exist
 * @param c Origami config file as json
 * @returns {Promise} When finished writing file
 */
exports.default = (c) => __awaiter(this, void 0, void 0, function* () {
    if (yield package_1.default())
        Promise.resolve(true);
    const p = {
        name: c.app.name.replace(/\s/g, '-').toLowerCase(),
        dependencies: {},
        scripts: {}
    };
    return package_1.write(p);
});
