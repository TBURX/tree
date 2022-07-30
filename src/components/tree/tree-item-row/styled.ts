import styled from 'styled-components';
import styleConstants from '../../../styles/constants';

export const StyledTreeItemRow = styled.div<{ level: number }>`
  display: flex;
  align-items: center;
  padding: 4px 8px 4px
    ${(props) => {
      const { level } = props;
      return 8 + level * styleConstants.iconSize;
    }}px !important;
  border-radius: ${styleConstants.borderRadius}px;
  &.selected {
    background-color: ${styleConstants.lightGray};
  }
  & > .toggler {
    user-select: none;
    cursor: pointer;
    &.hidden {
      visibility: hidden;
    }
  }
  & > .label {
    margin-left: 4px;
  }
`;
