import * as React from 'react';
import StyledButton from './styled';
import { IButtonProps } from './types';
import useButton from './useButton';

const ButtonComponent: React.FC<IButtonProps> = (props) => {
  const { text, clickHandler, className } = useButton(props);
  return (
    <StyledButton className={className} onClick={clickHandler}>
      {text}
    </StyledButton>
  );
};

const Button = React.memo(ButtonComponent);

export default Button;
