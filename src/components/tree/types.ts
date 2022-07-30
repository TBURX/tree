import { ECheckboxState } from '../checkbox/types';
import { EIcon } from '../icon/types';

export interface ITreeItem<T> {
  items?: ITreeItem<T>[];
  collapsed?: boolean;
  checked?: ECheckboxState;
  selected?: boolean;
  icon?: EIcon;
  label: string;
  data?: T;
}
export interface ITreeProps<T> {
  items: ITreeItem<T>[];
  someshit?: T;
  onItemChangeCheckState?: (state: ECheckboxState, id: string, data: T) => void;
  onItemChangeCollapsed?: (collapsed: boolean, id: string, data: T) => void;
  onItemClick?: (id: string, data: T) => void;
}
