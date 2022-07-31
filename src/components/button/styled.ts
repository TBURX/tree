import styled from 'styled-components';
import styleConstants from '../../styles/constants';

const StyledButton = styled.div`
  color: ${styleConstants.white};
  background-color: ${styleConstants.blue};
  border-radius: ${styleConstants.borderRadius}px;
  display: inline-block;
  padding: 8px;
  cursor: pointer;
  user-select: none;
  height: ${styleConstants.inputHeight}px;
  &:hover {
    filter: brightness(1.1);
  }
  &:active {
    filter: brightness(0.8);
  }
`;

export default StyledButton;
