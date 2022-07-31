import * as React from 'react';
import StyledInput from './styled';
import { IInputProps } from './types';
import useInput from './useInput';

const InputComponent: React.FC<IInputProps> = (props) => {
  const { placeholder, value, onChange, onkeyup, className } = useInput(props);
  return (
    <StyledInput
      className={className}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onKeyUp={onkeyup}
    />
  );
};

const Input = React.memo(InputComponent);

export default Input;
