import * as React from 'react';
import * as _ from 'lodash';
import { ITreeProps } from './types';
import { StyledTree, TreeSearch, TreeSearchHeader } from './styled';
import { useTree } from './useTree';

const Tree = <T,>(props: React.PropsWithChildren<ITreeProps<T>>) => {
  const {
    rows,
    className,
    searchable,
    searchString,
    onSearchStringChanged,
    onSearch,
  } = useTree<T>(props);
  return (
    <>
      {searchable && (
        <TreeSearchHeader>
          <TreeSearch
            value={searchString}
            onChange={onSearchStringChanged}
            onSearch={onSearch}
          />
        </TreeSearchHeader>
      )}
      <StyledTree className={className}>{rows}</StyledTree>
    </>
  );
};

export default React.memo(Tree, _.isEqual);
