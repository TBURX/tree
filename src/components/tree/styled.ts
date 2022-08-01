import styled from 'styled-components';
import styleConstants from '../../styles/constants';
import Search from '../search';

export const TreeSearch = styled(Search)`
  margin-bottom: 8px;
`;

export const TreeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 0;
  height: 0;
  background-color: ${styleConstants.darkGray};
`;

export const TreeSearchHeader = styled.div`
  padding: 8px;
`;

export const StyledTree = styled.div`
  padding: 8px;
  overflow: auto;
`;
