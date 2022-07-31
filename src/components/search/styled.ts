import styled from 'styled-components';
import styleConstants from '../../styles/constants';
import Button from '../button';
import Input from '../input';

export const SearchInput = styled(Input)`
  flex-grow: 1;
  flex-shrink: 1;
  width: 0;
`;

export const SearchButton = styled(Button)`
  margin-left: 8px;
`;

const StyledSearch = styled.div`
  display: flex;
  padding: 8px;
  background-color: ${styleConstants.lightGray};
  border-radius: ${styleConstants.borderRadius}px;
`;

export default StyledSearch;
