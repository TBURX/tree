import styled from 'styled-components';
import styleConstants from '../../../styles/constants';
import Icon from '../../icon';

export const Toggler = styled(Icon)`
  user-select: none;
  cursor: pointer;
`;

export const StyledTreeItemRow = styled.div<{
  level: number;
  selected?: boolean;
}>`
  display: flex;
  align-items: center;
  padding: 4px 8px 4px
    ${(props) => {
      const { level } = props;
      return 8 + level * styleConstants.iconSize;
    }}px;
  border-radius: ${styleConstants.borderRadius}px;
  ${(props) =>
    props.selected ? `background-color: ${styleConstants.lightGray};` : ''}
  & > .label {
    margin-left: 4px;
  }
`;
