import * as React from 'react';
import Tree from '../tree';
import { Generator, StyledApp } from './styled';
import Button from '../button';
import useApp from './useApp';

const App: React.FC = () => {
  const {
    refreshHandler,
    treeItems,
    searchString,
    changeCollapsedHandler,
    changeCheckHandler,
    itemClickHandler,
    searchStringChangeHandler,
    searchHandler,
  } = useApp();
  return (
    <StyledApp>
      <Generator>
        <Button
          text="Сгенерировать список сущностей"
          onClick={refreshHandler}
        />
      </Generator>
      <Tree
        searchable
        items={treeItems}
        searchString={searchString}
        onItemChangeCollapsed={changeCollapsedHandler}
        onItemChangeCheckState={changeCheckHandler}
        onItemClick={itemClickHandler}
        onSearchStringChanged={searchStringChangeHandler}
        onSearch={searchHandler}
      />
    </StyledApp>
  );
};

export default App;
