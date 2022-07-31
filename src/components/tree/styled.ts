import styled from 'styled-components';
import styleConstants from '../../styles/constants';
import Search from '../search';

export const TreeSearch = styled(Search)`
  margin-bottom: 8px;
`;

export const TreeSearchHeader = styled.div`
  padding: 8px;
  background-color: ${styleConstants.darkGray};
`;

export const StyledTree = styled.div`
  background-color: ${styleConstants.darkGray};
  padding: 8px;
  overflow: auto;
`;
