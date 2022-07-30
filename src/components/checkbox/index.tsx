import * as React from 'react';
import Icon from '../icon';
import { checkboxIcons } from './consts';
import { Wrapper } from './styled';
import { ICheckboxProps } from './types';
import useCheckbox from './useCheckbox';

const Checkbox: React.FC<ICheckboxProps> = (props) => {
  const { clickHandler, checkboxState, className } = useCheckbox(props);
  return (
    <Wrapper className={className}>
      <Icon icon={checkboxIcons[checkboxState]} onClick={clickHandler} />
    </Wrapper>
  );
};

export default React.memo(Checkbox);
