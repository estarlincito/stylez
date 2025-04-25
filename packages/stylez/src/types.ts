import type * as CSS from 'csstype';

export interface Breakpoints {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}
type Prop = string | number;
type Flat = CSS.PropertiesHyphen<Prop>;

type Nested = Partial<Record<`&${CSS.Pseudos}`, Flat>>;

type BreakpointKey = `@${'xs' | 'sm' | 'md' | 'lg' | 'xl'}`;

export type Props = Omit<Flat, keyof Nested> & Nested;

type MediaQuery = Partial<Record<BreakpointKey, Props>>;

export type Styles = Props &
  MediaQuery & {
    breakpoints?: Partial<Breakpoints>;
  };
