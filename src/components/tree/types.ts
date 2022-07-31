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
  className?: string;
  searchable?: boolean;
  searchString?: string;
  onSearchStringChanged?: (value: string) => void;
  onSearch?: () => void;
  items: ITreeItem<T>[];
  onItemChangeCheckState?: (
    state: ECheckboxState,
    itemPath: string,
    data: T
  ) => void;
  onItemChangeCollapsed?: (
    collapsed: boolean,
    itemPath: string,
    data: T
  ) => void;
  onItemClick?: (itemPath: string, data: T) => void;
}
