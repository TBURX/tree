import * as _ from 'lodash';
import * as React from 'react';
import { ECheckboxState } from '../checkbox/types';
import TreeItemRow from './tree-item-row';
import { ITreeItemRowProps } from './tree-item-row/types';
import { ITreeItem, ITreeProps } from './types';

export const useTree = <T,>({
  items,
  onItemChangeCheckState,
  onItemChangeCollapsed,
  onItemClick,
  className,
  searchable,
  searchString,
  onSearchStringChanged,
  onSearch,
}: ITreeProps<T>) => {
  const getTreeRowsProps = (
    levelItems: ITreeItem<T>[],
    level = 0,
    parentId = ''
  ): ITreeItemRowProps<T>[] => {
    let result: ITreeItemRowProps<T>[] = [];
    levelItems.forEach((item, index) => {
      const { collapsed, checked, selected, icon, label, data } = item;
      const itemPath = parentId ? `${parentId}.${index}` : `${index}`;
      const hasChild = !!item.items?.length;
      const pr: ITreeItemRowProps<T> = {
        data,
        itemPath,
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
          ...getTreeRowsProps(item.items, level + 1, itemPath),
        ];
      }
    });
    return result;
  };

  const itemsRef = React.useRef<ITreeItem<T>[]>(items);
  const [rowProps, setRowProps] = React.useState<ITreeItemRowProps<T>[]>(
    getTreeRowsProps(items)
  );
  const selectedItemRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    itemsRef.current = items;
    setRowProps(getTreeRowsProps(items));
  }, [items]);

  const handleChangeCheck = React.useCallback(
    (state: ECheckboxState, itemPath: string, data: T) => {
      const clone = _.cloneDeep(itemsRef.current);
      const item: ITreeItem<T> = _.get(
        clone,
        itemPath.split('.').join('.items.')
      );
      item.checked = state;
      _.set(clone, itemPath.split('.').join('.items.'), item);
      itemsRef.current = clone;
      setRowProps(getTreeRowsProps(clone));
      onItemChangeCheckState?.(state, itemPath, data);
    },
    [onItemChangeCheckState]
  );
  const handleChangeCollapse = React.useCallback(
    (collapsed: boolean, itemPath: string, data: T) => {
      const clone = _.cloneDeep(itemsRef.current);
      const item: ITreeItem<T> = _.get(
        clone,
        itemPath.split('.').join('.items.')
      );
      item.collapsed = collapsed;
      _.set(clone, itemPath.split('.').join('.items.'), item);
      itemsRef.current = clone;
      setRowProps(getTreeRowsProps(clone));
      onItemChangeCollapsed?.(collapsed, itemPath, data);
    },
    [onItemChangeCollapsed]
  );
  const handleClick = React.useCallback(
    (itemPath: string, data: T) => {
      onItemClick?.(itemPath, data);
    },
    [onItemClick]
  );
  const handleSearchStringChanged = React.useCallback(
    (value: string) => {
      onSearchStringChanged?.(value);
    },
    [onSearchStringChanged]
  );
  const handleSearch = React.useCallback(() => {
    onSearch?.();
  }, [onSearch]);
  const selectedRows = rowProps
    .map((row, index) => ({ row, index }))
    .filter((rowWithIndex) => rowWithIndex.row.selected);
  React.useEffect(() => {
    if (selectedRows.length) {
      selectedItemRef.current.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedRows]);
  const rows = rowProps.map((p, index) => (
    <TreeItemRow
      key={p.itemPath}
      {...p}
      innerRef={index === selectedRows[0]?.index ? selectedItemRef : undefined}
      onChangeCheckState={handleChangeCheck}
      onChangeCollapsed={handleChangeCollapse}
      onClick={handleClick}
    />
  ));
  return {
    rows,
    className,
    searchable,
    searchString,
    onSearchStringChanged: handleSearchStringChanged,
    onSearch: handleSearch,
  };
};
