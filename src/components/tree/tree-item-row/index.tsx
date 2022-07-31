import * as React from 'react';
import Checkbox from '../../checkbox';
import Icon from '../../icon';
import { EIcon } from '../../icon/types';
import { StyledTreeItemRow, Toggler } from './styled';
import { ITreeItemRowProps } from './types';
import { useTreeItemRow } from './useTreeItemRow';

const TreeItemRowComponent = <T,>(
  props: React.PropsWithChildren<ITreeItemRowProps<T>>
) => {
  const {
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
  } = useTreeItemRow<T>(props);
  return (
    <StyledTreeItemRow
      selected={selected}
      className={className}
      level={level}
      onClick={clickHandler}
      ref={innerRef}
    >
      <Toggler
        hidden={hiddenToggler}
        icon={
          collapsedState ? EIcon.TogglerCollapsed : EIcon.TogglerUncollapsed
        }
        onClick={togglerClickHandler}
      />
      <Checkbox
        checked={checkedState}
        onStateChange={checkStateChangeHandler}
      />
      <Icon icon={icon ?? EIcon.Placeholder} />
      <span className="label">{label}</span>
    </StyledTreeItemRow>
  );
};

const TreeItemRow = React.memo(TreeItemRowComponent);

export default TreeItemRow;
