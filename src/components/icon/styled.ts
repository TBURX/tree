import styled from 'styled-components';
import styleConstants from '../../styles/constants';

export const StyledIcon = styled.div<{ hidden: boolean }>`
  ${(props) => (props.hidden ? 'visibility: hidden;' : '')}
  width: ${styleConstants.iconSize}px;
  height: ${styleConstants.iconSize}px;
  display: inline-block;
`;
