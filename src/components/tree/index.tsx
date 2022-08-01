import * as React from 'react';
import * as _ from 'lodash';
import { ITreeProps } from './types';
import {
  StyledTree,
  TreeSearch,
  TreeSearchHeader,
  TreeWrapper,
} from './styled';
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
    <TreeWrapper>
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
    </TreeWrapper>
  );
};

export default React.memo(Tree, _.isEqual);
