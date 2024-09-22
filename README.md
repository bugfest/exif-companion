# exif-companion

exif-companion is a companion tool that transforms proprietary EXIF metadata into generic attributes, making these attributes consumable by tools that strictly adhere to the standards.

## Features

### Generate XMP metadata with standard EXIF regions attributes

These image files or sidecars can be used to import regions in photo management applications like [Immich](https://github.com/immich-app/immich)

## Compatible input formats

- ACDSee (since version `1.0.0`)

## Install

Prerequisites:
- nodejs

```shell
git clone https://github.com/bugfest/exif-companion
npm i --saveDev
```

Examples:
```shell
# show help
npm run start -- --help

# fix Image files
npm run start -- --input path/to/input.jpg --output path/to.output --keep

# fix XMP sidecar files)
npm run start -- --input path/to/input.jpg --output path/to.output --keep
```

### Command line options

```shell
Usage: index.ts -i <inputFilePath> -o <outputFilePath> [-k] [-d]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -i, --input    Path to input file                          [string] [required]
  -o, --output   Path to output file                         [string] [required]
  -k, --keep     Keep original metadata               [boolean] [default: false]
      --debug    Enable debug                         [boolean] [default: false]
```

## Docker

Build:
```shell
docker build . -t exif-companion
```

Usage:
```shell
docker run --rm -ti -v path/to/input-directory:/input:ro -v path/to/output-directory:/output exif-companion \
    --input '/input/filename.jpg' --output '/output/filename.jpg' --keep
```
