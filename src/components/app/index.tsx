import * as React from 'react';
import { useSelector } from 'react-redux';
import * as thunks from '../../store/thunks';
import { useDispatch } from '../../store/utils';
import { ECheckboxState } from '../checkbox/types';
import Tree from '../tree';
import { Generator, StyledApp } from './styled';
import slice from '../../store/slice';
import { Entity } from '../../bi/types';
import Button from '../button';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const treeItems = useSelector(slice.selectors.treeItems);
  const searchString = useSelector(slice.selectors.searchString);
  React.useEffect(() => {
    dispatch(thunks.load());
  }, []);
  const refreshHandler = React.useCallback(() => {
    dispatch(thunks.load());
  }, []);
  const changeCollapsedHandler = React.useCallback(
    (collapsed: boolean, path: string, data: Entity) => {
      dispatch(slice.actions.setCollapsed({ id: data.id, collapsed }));
    },
    []
  );
  const changeCheckHandler = React.useCallback(
    (checked: ECheckboxState, path: string, data: Entity) => {
      dispatch(
        thunks.setChecked({
          id: data.id,
          checked: checked === ECheckboxState.Checked,
        })
      );
    },
    []
  );
  const itemClickHandler = React.useCallback((path: string, data: Entity) => {
    dispatch(slice.actions.setSelectedEntity(data.id));
  }, []);
  const searchStringChangeHandler = React.useCallback((value: string) => {
    dispatch(thunks.setSearchString(value));
  }, []);
  const searchHandler = React.useCallback(() => {
    dispatch(thunks.search());
  }, []);
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
