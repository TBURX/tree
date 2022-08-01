import * as React from 'react';
import { useSelector } from 'react-redux';
import { Entity } from '../../bi/types';
import { useDispatch } from '../../store/utils';
import { ECheckboxState } from '../checkbox/types';
import * as thunks from '../../store/thunks';
import slice from '../../store/slice';

export default () => {
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
  return {
    refreshHandler,
    treeItems,
    searchString,
    changeCollapsedHandler,
    changeCheckHandler,
    itemClickHandler,
    searchStringChangeHandler,
    searchHandler,
  };
};
