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
exports.modifyXMP = modifyXMP;
const Utils_1 = require("./Utils");
const exiftool_vendored_1 = require("exiftool-vendored");
const Utils_2 = require("./Utils");
const fs_1 = __importDefault(require("fs"));
function modifyXMP(inputFilePath, outputFilePath, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const exiftool = new exiftool_vendored_1.ExifTool();
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
            yield fs_1.default.existsSync(inputFilePath);
            yield fs_1.default.copyFileSync(inputFilePath, outputFilePath);
        }
        catch (e) {
            // tslint:disable-next-line:no-unsafe-any
            if ((0, Utils_2.isNodeError)(e) && e.code === 'ENOENT') {
                logger.error(`File not found: ${inputFilePath}`);
            }
            else {
                logger.error('Error creating output file:', e);
            }
            return 1;
        }
        try {
            // Read the existing XMP data
            const metadata = yield exiftool.read(outputFilePath);
            logger.debug('Original metadata:', (0, Utils_1.prettyStringify)(metadata));
            if (metadata.RegionInfoACDSee) {
                metadata.RegionInfo = {
                    AppliedToDimensions: {
                        H: metadata.RegionInfoACDSee.AppliedToDimensions.H,
                        W: metadata.RegionInfoACDSee.AppliedToDimensions.W,
                        Unit: metadata.RegionInfoACDSee.AppliedToDimensions.Unit,
                    },
                    RegionList: metadata.RegionInfoACDSee.RegionList.map((ACDSeeRegion) => {
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
                        };
                    }),
                };
                if (!preserveCustomMetadata) {
                    metadata.RegionInfoACDSee = undefined;
                }
            }
            // Remove default Orientation - causes issues in MacOS (WTF?!)
            if (metadata.Orientation == 1) {
                metadata.Orientation = undefined;
            }
            yield exiftool.write(outputFilePath, metadata);
            logger.debug('output metadata:', (0, Utils_1.prettyStringify)(metadata));
            logger.debug(`XMP file updated successfully: ${outputFilePath}`);
        }
        catch (error) {
            logger.error('Error processing XMP file:', error);
            return 1;
        }
        finally {
            yield exiftool.end();
        }
        return 0;
    });
}
