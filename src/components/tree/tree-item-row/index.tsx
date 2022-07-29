import classNames from 'classnames';
import * as React from 'react';
import Checkbox, { ECheckboxState } from '../../checkbox';
import Icon, { EIcon } from '../../icon';
import { ITreeItem } from '../types';
import './style.less';

export interface ITreeItemRowProps<T> extends Omit<ITreeItem<T>, 'items'> {
  id: string;
  hasChild?: boolean;
  level: number;
  onChangeCheckState?: (state: ECheckboxState, id: string, data: T) => void;
  onChangeCollapsed?: (collapsed: boolean, id: string, data: T) => void;
}

const TreeItemRowComponent = <T,>({
  id,
  hasChild,
  collapsed,
  checked = ECheckboxState.Blank,
  selected,
  icon,
  label,
  level,
  onChangeCheckState,
  onChangeCollapsed,
  data,
}: React.PropsWithChildren<ITreeItemRowProps<T>>) => {
  const [collapsedState, setCollapsedState] = React.useState<boolean>(false);
  React.useEffect(() => {
    setCollapsedState(collapsed);
  }, [collapsed]);
  const togglerClickHandler = React.useCallback(() => {
    setCollapsedState(!collapsedState);
    onChangeCollapsed?.(!collapsedState, id, data);
  }, [onChangeCollapsed, collapsedState]);
  const checkStateChangeHandler = React.useCallback(
    (state: ECheckboxState) => {
      onChangeCheckState?.(state, id, data);
    },
    [onChangeCheckState, id, data]
  );
  const classes = classNames({ selected }, 'tree-item');
  const togglerClasses = classNames({ hidden: !hasChild }, 'toggler');
  return (
    <div className={classes}>
      <span className="space" style={{ width: 24 * level }} />
      <Icon
        className={togglerClasses}
        icon={
          collapsedState ? EIcon.TogglerCollapsed : EIcon.TogglerUncollapsed
        }
        onClick={togglerClickHandler}
      />
      <Checkbox checked={checked} onStateChange={checkStateChangeHandler} />
      <Icon icon={icon ?? EIcon.Placeholder} />
      <span className="label">{label}</span>
    </div>
  );
};

const TreeItemRow = React.memo(TreeItemRowComponent);

export default TreeItemRow;
