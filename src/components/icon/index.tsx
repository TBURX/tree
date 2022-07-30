import * as React from 'react';
import { StyledIcon } from './styled';
import { IIconProps } from './types';
import useIcon from './useIcon';

const Icon: React.FC<IIconProps> = (props) => {
  const { onClickHandler, svgIcon, className } = useIcon(props);
  return (
    <StyledIcon
      className={className}
      onClick={onClickHandler}
      dangerouslySetInnerHTML={{ __html: svgIcon }}
    />
  );
};

export default React.memo(Icon);
