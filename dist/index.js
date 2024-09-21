"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const XMP_1 = require("./XMP");
const tslog_1 = require("tslog");
// Main function
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // Use yargs to parse command-line arguments
        const argv = (0, yargs_1.default)(process.argv.slice(2))
            .usage('Usage: $0 -i <inputFilePath> -o <outputFilePath> [-k] [-d]')
            .options({
            input: {
                type: 'string',
                alias: 'i',
                demandOption: true,
                description: "Path to input file",
            },
            output: {
                type: 'string',
                alias: 'o',
                demandOption: true,
                description: "Path to output file",
            },
            keep: {
                type: 'boolean',
                alias: 'k',
                demandOption: false,
                default: false,
                description: "Keep original metadata",
            },
            debug: {
                type: 'boolean',
                demandOption: false,
                default: false,
                description: "Enable debug",
            },
        })
            .parseSync();
        const inputFilePath = argv.input; // Path to your input XMP file
        const outputFilePath = argv.output; // Path for the output XMP file
        const preserveMetadata = argv.keep; // Preserve original (custom) metadata
        const logger = new tslog_1.Logger({ name: "exif-companion", minLevel: argv.debug ? 1 : 3 });
        const error = yield (0, XMP_1.modifyXMP)(inputFilePath, outputFilePath, { preserveMetadata: preserveMetadata, logger: logger });
        process.exit(error);
    });
}
main();
