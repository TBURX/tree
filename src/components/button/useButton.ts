import * as React from 'react';
import { IButtonProps } from './types';

const useButton = ({ text, onClick, className }: IButtonProps) => {
  const clickHandler = React.useCallback(() => {
    onClick?.();
  }, [onClick]);

  return { text, clickHandler, className };
};
export default useButton;
