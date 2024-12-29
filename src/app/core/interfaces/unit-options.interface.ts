import { Unit } from '../types/unit.type';
import { Option } from './option.interface';

export interface UnitOptions {
  label: string;
  options: Option<Unit>[];
}
