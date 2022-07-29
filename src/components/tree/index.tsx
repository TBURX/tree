import * as React from 'react';
import * as _ from 'lodash';
import { ECheckboxState } from '../checkbox';
import TreeItemRow, { ITreeItemRowProps } from './tree-item-row';
import './style.less';
import { ITreeItem } from './types';

export interface ITreeProps<T> {
  items: ITreeItem<T>[];
  onItemChangeCheckState?: (state: ECheckboxState, id: string, data: T) => void;
  onItemChangeCollapsed?: (collapsed: boolean, id: string, data: T) => void;
}

const Tree = <T,>({
  items,
  onItemChangeCheckState,
  onItemChangeCollapsed,
}: React.PropsWithChildren<ITreeProps<T>>) => {
  const getTreeRowsProps = (
    levelItems: ITreeItem<T>[],
    level = 0,
    parentId = ''
  ): ITreeItemRowProps<T>[] => {
    let result: ITreeItemRowProps<T>[] = [];
    levelItems.forEach((item, index) => {
      const { collapsed, checked, selected, icon, label, data } = item;
      const itemId = parentId ? `${parentId}.${index}` : `${index}`;
      const hasChild = !!item.items?.length;
      const pr: ITreeItemRowProps<T> = {
        data,
        id: itemId,
        hasChild,
        level,
        collapsed,
        checked,
        selected,
        icon,
        label,
      };
      result.push(pr);

      if (hasChild && !collapsed) {
        result = [
          ...result,
          ...getTreeRowsProps(item.items, level + 1, itemId),
        ];
      }
    });
    return result;
  };

  const itemsRef = React.useRef<ITreeItem<T>[]>(items);
  const [rowProps, setRowProps] = React.useState<ITreeItemRowProps<T>[]>(
    getTreeRowsProps(items)
  );

  const handleChangeCheck = React.useCallback(
    (state: ECheckboxState, id: string, data: T) => {
      const clone = _.cloneDeep(itemsRef.current);
      const item: ITreeItem<T> = _.get(clone, id.split('.').join('.items.'));
      item.checked = state;
      _.set(clone, id.split('.').join('.items.'), item);
      itemsRef.current = clone;
      setRowProps(getTreeRowsProps(clone));
      onItemChangeCheckState?.(state, id, data);
    },
    [onItemChangeCheckState]
  );
  const handleChangeCollapse = React.useCallback(
    (collapsed: boolean, id: string, data: T) => {
      const clone = _.cloneDeep(itemsRef.current);
      const item: ITreeItem<T> = _.get(clone, id.split('.').join('.items.'));
      item.collapsed = collapsed;
      _.set(clone, id.split('.').join('.items.'), item);
      itemsRef.current = clone;
      setRowProps(getTreeRowsProps(clone));
      onItemChangeCollapsed?.(collapsed, id, data);
    },
    [onItemChangeCollapsed]
  );
  return (
    <div className="tree">
      {rowProps.map((p) => (
        <TreeItemRow
          key={p.id}
          {...p}
          onChangeCheckState={handleChangeCheck}
          onChangeCollapsed={handleChangeCollapse}
        />
      ))}
    </div>
  );
};

export default React.memo(Tree, _.isEqual);
