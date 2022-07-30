import { ECheckboxState } from '../../checkbox/types';
import { ITreeItem } from '../types';

export interface ITreeItemRowProps<T> extends Omit<ITreeItem<T>, 'items'> {
  id: string;
  hasChild?: boolean;
  level: number;
  onChangeCheckState?: (state: ECheckboxState, id: string, data: T) => void;
  onChangeCollapsed?: (collapsed: boolean, id: string, data: T) => void;
  onClick?: (id: string, data: T) => void;
}
