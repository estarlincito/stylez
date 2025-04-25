import { z } from 'zod';

const pxString = z.string().optional();
// .regex(/^\d+px$/, { message: 'Must be a number followed by "px"' });
// .optional();
export const breakpointsSchema = z.object({
  xs: pxString,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  sm: pxString,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  md: pxString,
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  lg: pxString,
  xl: pxString,
});
