import { createAsyncThunk } from '@reduxjs/toolkit';
import slice from './slice';
import * as bi from '../bi';
import { Entity } from '../bi/types';
import { IState } from './types';

export const load = createAsyncThunk('loadThunk', async (payload, thunkApi) => {
  const { dispatch } = thunkApi;
  const entities = await bi.getEntities();
  dispatch(slice.actions.setEntities(entities));
});

const checkChildren = createAsyncThunk<
  void,
  { checked: boolean; children: Entity[] },
  { state: IState }
>('checkChildrenThunk', async (payload, thunkApi) => {
  const { checked, children } = payload;
  const { dispatch, getState } = thunkApi;
  const state = getState();
  children.forEach((child) => {
    const { id } = child;
    dispatch(slice.actions.setChecked({ id, checked }));
    const children1 = slice.selectors.children(state)(id);
    if (children1.length) {
      dispatch(checkChildren({ checked, children: children1 }));
    }
  });
});

const checkParents = createAsyncThunk<
  void,
  { checked: boolean; parent: Entity },
  { state: IState }
>('checkChildrenThunk', async (payload, thunkApi) => {
  const { checked, parent } = payload;
  const { dispatch, getState } = thunkApi;
  const state = getState();
  const parent1 = slice.selectors.parent(state)(parent.id);
  if (!checked) {
    dispatch(slice.actions.setChecked({ id: parent.id, checked }));
    if (parent1) {
      dispatch(checkParents({ parent: parent1, checked }));
    }
    return;
  }
  const children = slice.selectors.children(state)(parent.id);
  const checkedChildren = children.filter((child) =>
    slice.selectors.isChecked(state)(child.id)
  );
  if (children.length === checkedChildren.length) {
    dispatch(slice.actions.setChecked({ id: parent.id, checked }));
    if (parent1) {
      dispatch(checkParents({ parent: parent1, checked }));
    }
  }
});

export const setChecked = createAsyncThunk<
  void,
  { id: string; checked: boolean },
  { state: IState }
>('setCheckedThunk', async (payload, thunkApi) => {
  const { id, checked } = payload;
  const { dispatch, getState } = thunkApi;
  const state = getState();
  dispatch(slice.actions.setChecked({ id, checked }));
  const children = slice.selectors.children(state)(id);
  if (children.length) {
    dispatch(checkChildren({ checked, children }));
  }
  const parent = slice.selectors.parent(state)(id);
  if (parent) {
    dispatch(checkParents({ checked, parent }));
  }
});

export const setSearchString = createAsyncThunk<
  void,
  string,
  { state: IState }
>('setSearchStringThunk', async (payload, thunkApi) => {
  const { dispatch } = thunkApi;
  dispatch(slice.actions.setSearchPerformed(false));
  dispatch(slice.actions.setSearchString(payload));
});

export const search = createAsyncThunk<void, undefined, { state: IState }>(
  'searchThunk',
  async (payload, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const state = getState();
    const searchPerformed = slice.selectors.searchPerformed(state);
    if (!searchPerformed) {
      const searchString = slice.selectors.searchString(state);
      const entities = slice.selectors.entities(state);
      const searchResult = Object.values(entities).filter((entity) =>
        entity.name.toLowerCase().includes(searchString.toLowerCase())
      );
      console.log(searchResult);
      dispatch(slice.actions.setSearchPerformed(true));
    }
  }
);
