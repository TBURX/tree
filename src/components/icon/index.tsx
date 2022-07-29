/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import classNames from 'classnames';
import * as React from 'react';
import './style.less';

export enum EIcon {
  Placeholder = 'placeholder',
  Checkbox = 'square',
  CheckboxIndeterminate = 'square-square',
  CheckboxChecked = 'check-square',
  TogglerCollapsed = 'plus-square',
  TogglerUncollapsed = 'minus-square',
  Folder = 'folder',
  File = 'file',
  Car = 'crow',
}

export interface IIconProps {
  icon: EIcon;
  className?: string;
  onClick?: () => void;
}

const Icon: React.FC<IIconProps> = ({ icon, onClick, className }) => {
  const onClickHandler = React.useCallback(() => {
    onClick?.();
  }, [onClick]);
  let svgIcon: string;
  try {
    svgIcon = require(`../../assets/icons/${icon}.svg`);
  } catch {
    svgIcon = require(`../../assets/icons/placeholder.svg`);
  }
  const classes = classNames(className, 'icon');
  return (
    <div
      onClick={onClickHandler}
      className={classes}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svgIcon }}
    />
  );
};

export default React.memo(Icon);
