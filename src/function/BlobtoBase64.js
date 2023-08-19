const { Buffer } = require('buffer');

export default function BlobtoBase64(blob)
{
    const bufferString =  Buffer.from(blob).toString('base64');
    return `data:image/jpeg;base64,${bufferString}`
}
