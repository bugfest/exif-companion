"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNodeError = void 0;
exports.prettyStringify = prettyStringify;
function prettyStringify(obj) {
    return JSON.stringify(obj, null, 2);
}
/**
 * @param error the error object.
 * @returns if given error object is a NodeJS error.
 */
const isNodeError = (error) => error instanceof Error;
exports.isNodeError = isNodeError;
