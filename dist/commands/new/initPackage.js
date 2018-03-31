"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const origami_core_lib_1 = require("origami-core-lib");
/**
 * Creates a basic package.json file if it doesn't already exist
 * @param c Origami config file as json
 * @returns {Promise} When finished writing file
 */
exports.default = (c) => __awaiter(this, void 0, void 0, function* () {
    if (yield origami_core_lib_1.pkgjson.read())
        Promise.resolve(true);
    const p = {
        name: c.app.name.replace(/\s/g, '-').toLowerCase(),
        dependencies: {},
        scripts: {}
    };
    return origami_core_lib_1.pkgjson.write(p);
});
