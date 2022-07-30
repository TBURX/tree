import * as React from 'react';
import * as _ from 'lodash';
import { ITreeProps } from './types';
import { StyledTree } from './styled';
import { useTree } from './useTree';

const Tree = <T,>(props: React.PropsWithChildren<ITreeProps<T>>) => {
  const { rows } = useTree<T>(props);
  return <StyledTree>{rows}</StyledTree>;
};

export default React.memo(Tree, _.isEqual);
