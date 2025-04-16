import { num } from '@estarlincito/utils';
import crypto from 'crypto';

/**
 * Generates a unique ID using an MD5 hash.
 *
 * @param {string | number} content - The content to hash.
 * @param {string} label - A prefix label for the generated ID.
 * @returns {string} The generated unique ID.
 */
const generateID = (content: string | number, label: string): string =>
  `${label}${crypto
    .createHash('md5')
    .update(`stylez${content}`)
    .digest('hex')
    .slice(num('0'), num('8'))}`;

export const toVarKey = (value: string | number) => generateID(value, '--z');

export const toClassName = (
  props: Record<string, string | Record<string, string>>,
) => generateID(JSON.stringify(props), 'z_');

export const toCssPro = (prop: string) =>
  prop.replace(/([A-Z])/g, (m: string) => `-${m.toLowerCase()}`);
