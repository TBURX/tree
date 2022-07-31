import * as React from 'react';
import { ISearchProps } from './types';

export default ({ value, className, onChange, onSearch }: ISearchProps) => {
  const changeHandler = React.useCallback(
    (val: string) => {
      onChange?.(val);
    },
    [onChange]
  );
  const searchHandler = React.useCallback(() => {
    onSearch?.();
  }, [onSearch]);
  return {
    value,
    className,
    onChange: changeHandler,
    onSearch: searchHandler,
  };
};
