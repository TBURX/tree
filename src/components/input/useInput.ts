import * as React from 'react';
import { IInputProps } from './types';

export default ({
  value,
  placeholder,
  onChange,
  onEnter,
  className,
}: IInputProps) => {
  const [valueState, setValueState] = React.useState<string>(value);
  const changeHandler = React.useCallback<
    React.ChangeEventHandler<HTMLInputElement>
  >(
    (e) => {
      setValueState(e.target.value);
      onChange?.(e.target.value);
    },
    [onChange]
  );
  const keyUpHandler = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    (e) => {
      if (e.key === 'Enter') {
        onEnter?.();
      }
    },
    [onEnter]
  );
  React.useEffect(() => {
    setValueState(value);
  }, [value]);
  return {
    value: valueState,
    placeholder,
    onChange: changeHandler,
    onkeyup: keyUpHandler,
    className,
  };
};
