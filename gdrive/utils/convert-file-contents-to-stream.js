import { Readable } from 'stream';

export function toReadableStream(input) {
  if (input instanceof Readable) {
    return input;
  } else if (Buffer.isBuffer(input) || typeof input === 'string') {
    return Readable.from([input]);
  } else {
    throw new Error('Unsupported fileContents type: must be a stream, buffer, or string');
  }
}