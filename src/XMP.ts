
import { prettyStringify } from './Utils'
import { ExifTool } from 'exiftool-vendored';
import { CustomTags } from './Tags';
import { Logger } from "tslog";
import { isNodeError } from "./Utils"
import fs from 'fs';

type ModifyXMPOptions = {
    preserveMetadata?: boolean
    logger: Logger<unknown>,
}

export async function modifyXMP(inputFilePath: string, outputFilePath: string, options: ModifyXMPOptions): Promise<number> {
    
    const exiftool = new ExifTool();
    var preserveCustomMetadata = options.preserveMetadata;
    const logger = options.logger;

    logger.debug('modifyXMP called with args: ', {
        inputFilePath: inputFilePath,
        outputFilePath: outputFilePath,
        options: {
            preserveCustomMetadata: preserveCustomMetadata
        }
    });
    
    try {
        await fs.existsSync(inputFilePath)
        await fs.copyFileSync(inputFilePath, outputFilePath)
    } catch (e) {
        // tslint:disable-next-line:no-unsafe-any
        if (isNodeError(e) && e.code === 'ENOENT') {
            logger.error(`File not found: ${inputFilePath}`)
        } else {
            logger.error('Error creating output file:', e);
        }
        return 1
    }

    try {
        // Read the existing XMP data
        const metadata = await exiftool.read<CustomTags>(outputFilePath);
        logger.debug('Original metadata:', prettyStringify(metadata));
        if (metadata.RegionInfoACDSee) {
            metadata.RegionInfo = {
                AppliedToDimensions: {
                    H: metadata.RegionInfoACDSee.AppliedToDimensions.H,
                    W: metadata.RegionInfoACDSee.AppliedToDimensions.W,
                    Unit: metadata.RegionInfoACDSee.AppliedToDimensions.Unit,
                },
                RegionList:
                    metadata.RegionInfoACDSee.RegionList.map((ACDSeeRegion) => {
                        return {
                            Area: {
                                X: ACDSeeRegion.ALGArea.X,
                                Y: ACDSeeRegion.ALGArea.Y,
                                W: ACDSeeRegion.ALGArea.W,
                                H: ACDSeeRegion.ALGArea.H,
                                Unit: 'normalized',
                            },
                            Type: ACDSeeRegion.Type,
                            Name: ACDSeeRegion.Name,
                        }
                    }),
            }

            if (!preserveCustomMetadata) {
                metadata.RegionInfoACDSee = undefined;
            }
        }

        await exiftool.write(outputFilePath, metadata)

        logger.debug('output metadata:', prettyStringify(metadata));
        logger.debug(`XMP file updated successfully: ${outputFilePath}`);
    } catch (error) {
        logger.error('Error processing XMP file:', error);
        return 1
    } finally {
        await exiftool.end();
    }
    return 0
}