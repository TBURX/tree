import styled from 'styled-components';
import styleConstants from '../../styles/constants';

const StyledInput = styled.input`
  background-color: ${styleConstants.darkGray};
  outline: none;
  color: ${styleConstants.textColor};
  padding: 8px;
  border-style: none;
  border-radius: ${styleConstants.borderRadius}px;
  height: ${styleConstants.inputHeight}px;
  &::placeholder {
    color: ${styleConstants.textColor};
    filter: opacity(50%);
  }
`;

export default StyledInput;
