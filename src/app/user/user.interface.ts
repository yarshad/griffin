import {Theme} from './theme'

export interface User {
  name: string;
  age?: number;
  gender?: string;
  role?: string;
  theme?: Theme;
  isActive?: boolean;
  topics?: string[];
  toggle?: string;
}