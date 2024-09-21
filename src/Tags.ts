import { Tags } from 'exiftool-vendored';

export interface ExtendedTags extends Tags {

    // Extended properties for image regions, such as faces
    RegionInfo?: {
        AppliedToDimensions: {
            W: number;
            H: number;
            Unit: string;
        };
        RegionList: {
            Area: {
                // (X,Y) // center of the rectangle
                X: number;
                Y: number;
                W: number;
                H: number;
                Unit: string;
            };
            Rotation?: number;
            Type?: string;
            Name?: string;
        }[];
    };
}

export interface CustomTags extends ExtendedTags {

    // ACDSee region metadata format
    RegionInfoACDSee?: {
        AppliedToDimensions: {
            W: number;
            H: number;
            Unit: string;
        };
        RegionList: {
            // Outer rectangle
            ALGArea: {
                // (X,Y) // center of the rectangle
                X: number;
                Y: number;
                W: number;
                H: number;
            };
            // Inner rectangle
            DLYArea: {
                // (X,Y) // center of the rectangle
                X: number;
                Y: number;
                W: number;
                H: number;
            };
            Type?: string;
            Name?: string;
            NameAssignType?: string;
        }[];
    }
}
