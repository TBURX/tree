import { ECheckboxState } from '../checkbox';
import { EIcon } from '../icon';

export interface ITreeItem<T> {
  items?: ITreeItem<T>[];
  collapsed?: boolean;
  checked?: ECheckboxState;
  selected?: boolean;
  icon?: EIcon;
  label: string;
  data?: T;
}
