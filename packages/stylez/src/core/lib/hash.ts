import crypto from 'crypto';

export const toHash = (content: string, label: string): string =>
  `${label}${crypto
    .createHash('md5')
    .update(`stylez${content}`)
    .digest('hex')
    .slice(0, 8)}`;
