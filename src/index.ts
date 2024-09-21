import yargs from 'yargs';
import { modifyXMP } from './XMP'
import { Logger } from "tslog";

// Main function
async function main() {
    
    // Use yargs to parse command-line arguments
    const argv = yargs(process.argv.slice(2))
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
    const logger = new Logger({ name: "exif-companion", minLevel: argv.debug? 1 : 3 });
    const error = await modifyXMP(inputFilePath, outputFilePath, {preserveMetadata: preserveMetadata, logger: logger});
    process.exit(error)
}

main();
