import classNames from 'classnames';
import * as React from 'react';
import { ECheckboxState } from '../../checkbox/types';
import { ITreeItemRowProps } from './types';

export const useTreeItemRow = <T>(props: ITreeItemRowProps<T>) => {
  const {
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
    onClick,
    data,
  } = props;
  const [collapsedState, setCollapsedState] = React.useState<boolean>(false);
  const [checkedState, setCheckedState] =
    React.useState<ECheckboxState>(checked);
  const onChangeCollapsedTriggered = React.useRef<boolean>(false);
  const checkedChanged = React.useRef<boolean>(false);
  React.useEffect(() => {
    if (onChangeCollapsedTriggered.current) {
      onChangeCollapsedTriggered.current = false;
      return;
    }
    setCollapsedState(collapsed);
  }, [collapsed]);
  React.useEffect(() => {
    onChangeCollapsedTriggered.current = true;
    onChangeCollapsed?.(collapsedState, id, data);
  }, [collapsedState]);
  const togglerClickHandler = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (event) => {
      event.stopPropagation();
      setCollapsedState(!collapsedState);
    },
    [collapsedState]
  );
  React.useEffect(() => {
    checkedChanged.current = true;
    setCheckedState(checked);
  }, [checked]);
  React.useEffect(() => {
    onChangeCheckState?.(checkedState, id, data);
  }, [checkedState]);
  const checkStateChangeHandler = React.useCallback(
    (state: ECheckboxState) => {
      if (checkedChanged.current) {
        checkedChanged.current = false;
        return;
      }
      setCheckedState(state);
    },
    [onChangeCheckState, id, data]
  );
  const clickHandler = React.useCallback(() => {
    onClick?.(id, data);
  }, [onClick, id, data]);
  const classes = classNames({ selected });
  const togglerClasses = classNames({ hidden: !hasChild }, 'toggler');
  return {
    classes,
    level,
    clickHandler,
    togglerClasses,
    collapsedState,
    togglerClickHandler,
    checkedState,
    checkStateChangeHandler,
    icon,
    label,
  };
};
