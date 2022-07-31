import * as React from 'react';
import StyledSearch, { SearchButton, SearchInput } from './styled';
import { ISearchProps } from './types';
import useSearch from './useSearch';

const SearchComponent: React.FC<ISearchProps> = (props) => {
  const { value, onChange, onSearch, className } = useSearch(props);
  return (
    <StyledSearch className={className}>
      <SearchInput
        className="search-input"
        value={value}
        placeholder="Поиск"
        onEnter={onSearch}
        onChange={onChange}
      />
      <SearchButton text="Найти" onClick={onSearch} />
    </StyledSearch>
  );
};

const Search = React.memo(SearchComponent);
export default Search;
