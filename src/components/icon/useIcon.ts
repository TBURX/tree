/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import * as React from 'react';
import { IIconProps } from './types';

const useIcon = (props: IIconProps) => {
  const { icon, onClick, hidden, className } = props;
  const onClickHandler = React.useCallback<
    React.MouseEventHandler<HTMLDivElement>
  >(
    (event) => {
      onClick?.(event);
    },
    [onClick]
  );
  let svgIcon: string;
  try {
    svgIcon = require(`../../assets/icons/${icon}.svg`);
  } catch {
    svgIcon = require(`../../assets/icons/placeholder.svg`);
  }
  return {
    onClickHandler,
    svgIcon,
    hidden,
    className,
  };
};

export default useIcon;
