import * as React from 'react';
import { ECheckboxState } from '../../checkbox/types';
import { ITreeItemRowProps } from './types';

export const useTreeItemRow = <T>(props: ITreeItemRowProps<T>) => {
  const {
    itemPath,
    hasChild,
    collapsed,
    checked = ECheckboxState.Blank,
    selected,
    icon,
    label,
    level,
    onChangeCheckState,
    onChangeCollapsed,
    onClick,
    data,
    innerRef,
    className,
  } = props;
  const [collapsedState, setCollapsedState] =
    React.useState<boolean>(collapsed);
  const [checkedState, setCheckedState] =
    React.useState<ECheckboxState>(checked);
  React.useEffect(() => {
    setCollapsedState(collapsed);
  }, [collapsed]);
  const togglerClickHandler = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (event) => {
      event.stopPropagation();
      setCollapsedState(!collapsedState);
      onChangeCollapsed?.(!collapsedState, itemPath, data);
    },
    [onChangeCollapsed, collapsedState, itemPath, data]
  );
  React.useEffect(() => {
    setCheckedState(checked);
  }, [checked]);
  const checkStateChangeHandler = React.useCallback(
    (state: ECheckboxState) => {
      setCheckedState(state);
      onChangeCheckState?.(state, itemPath, data);
    },
    [onChangeCheckState, itemPath, data]
  );
  const clickHandler = React.useCallback(() => {
    onClick?.(itemPath, data);
  }, [onClick, itemPath, data]);
  const hiddenToggler = !hasChild;
  return {
    className,
    level,
    clickHandler,
    hiddenToggler,
    collapsedState,
    togglerClickHandler,
    checkedState,
    checkStateChangeHandler,
    icon,
    label,
    innerRef,
    selected,
  };
};
