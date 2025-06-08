import { Readable } from 'stream';

export function convertFileContentsToStream(fileContents) {
    return Readable.from([fileContents]);
}