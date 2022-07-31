import * as React from 'react';
import Icon from '../icon';
import { checkboxIcons } from './consts';
import { StyledCheckbox } from './styled';
import { ICheckboxProps } from './types';
import useCheckbox from './useCheckbox';

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { clickHandler, checkboxState, className } = useCheckbox(props);
  return (
    <StyledCheckbox className={className}>
      <Icon icon={checkboxIcons[checkboxState]} onClick={clickHandler} />
    </StyledCheckbox>
  );
};

export default React.memo(Checkbox);
