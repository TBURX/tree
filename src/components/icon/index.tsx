import * as React from 'react';
import { StyledIcon } from './styled';
import { IIconProps } from './types';
import useIcon from './useIcon';

const IconComponent: React.FC<IIconProps> = (props) => {
  const { onClickHandler, svgIcon, hidden, className } = useIcon(props);
  return (
    <StyledIcon
      className={className}
      hidden={hidden}
      onClick={onClickHandler}
      dangerouslySetInnerHTML={{ __html: svgIcon }}
    />
  );
};

const Icon = React.memo(IconComponent);
export default Icon;
