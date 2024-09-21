# exif-companion

exif-companion is a companion tool that transforms proprietary EXIF metadata into generic attributes, making these attributes consumable by tools that strictly adhere to the standards.

## Features

### Generate XMP metadata with standard EXIF regions attributes

These files/sidecars can be used to import regions in photo management applications like [Immich](https://github.com/immich-app/immich)

## Compatible input formats

- ACDSee (since version `0.0.1`)

## Install

Prerequisites:
- nodejs

```shell
git clone https://github.com/bugfest/exif-companion
npm i
```

## Usage

```shell
$ npm run start -- --help

Usage: index.ts -i <inputFilePath> -o <outputFilePath> [-k] [-d]

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -i, --input    Path to input file                          [string] [required]
  -o, --output   Path to output file                         [string] [required]
  -k, --keep     Keep original metadata               [boolean] [default: false]
      --debug    Enable debug                         [boolean] [default: false]
```

Example:
```shell
npm run start -- --input path/to/input.jpg.xmp --output path/to.output.xmp --keep
```
