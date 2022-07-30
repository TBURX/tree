import * as React from 'react';
import Checkbox from '../../checkbox';
import Icon from '../../icon';
import { EIcon } from '../../icon/types';
import { StyledTreeItemRow } from './styled';
import { ITreeItemRowProps } from './types';
import { useTreeItemRow } from './useTreeItemRow';

const TreeItemRowComponent = <T,>(
  props: React.PropsWithChildren<ITreeItemRowProps<T>>
) => {
  const {
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
  } = useTreeItemRow<T>(props);
  return (
    <StyledTreeItemRow className={classes} level={level} onClick={clickHandler}>
      <Icon
        className={togglerClasses}
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
