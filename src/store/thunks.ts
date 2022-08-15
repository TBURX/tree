import { createAsyncThunk } from '@reduxjs/toolkit';
import slice from './slice';
import * as bi from '../bi';
import { Entity } from '../bi/types';
import { Dispatcher, IState } from './types';
import { ITreeItem } from '../components/tree/types';

/**
 * обновление списка сущностей
 */
export const load = createAsyncThunk('loadThunk', async (payload, thunkApi) => {
  const { dispatch } = thunkApi;
  const entities = await bi.getEntities();
  dispatch(slice.actions.setEntities(entities));
  dispatch(slice.actions.setSearchPerformed(false));
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

/**
 * отмечает выбранный элемент и если нужно отмечает или убирает галку с родителей и потомков
 */
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

/**
 * устанавливает поисковую строку в стейт и сбрасывает поиск
 */
export const setSearchString = createAsyncThunk<
  void,
  string,
  { state: IState }
>('setSearchStringThunk', async (payload, thunkApi) => {
  const { dispatch } = thunkApi;
  dispatch(slice.actions.setSearchPerformed(false));
  dispatch(slice.actions.setSearchString(payload));
});

const flattenTree = <T>(items: ITreeItem<T>[]): T[] => {
  const result: T[] = [];
  items.forEach((item) => {
    result.push(item.data);
    if (item.items) {
      const subitems = flattenTree(item.items);
      subitems.forEach((sub) => {
        result.push(sub);
      });
    }
  });
  return result;
};

/**
 * разворачивает ноды с родителями сущности
 * @param id id сущности
 */
const uncollapseParents = (id: string, dispatch: Dispatcher, state: IState) => {
  const collapsedEntityIds = slice.selectors.collapsedEntityIds(state);
  const parent = slice.selectors.parent(state)(id);
  if (parent) {
    if (collapsedEntityIds.includes(parent.id)) {
      dispatch(slice.actions.setCollapsed({ id: parent.id, collapsed: false }));
    }
    uncollapseParents(parent.id, dispatch, state);
  }
};

/**
 * выполняет поиск по сущностям
 */
export const search = createAsyncThunk<void, undefined, { state: IState }>(
  'searchThunk',
  async (payload, thunkApi) => {
    const { dispatch, getState } = thunkApi;
    const state = getState();
    const searchPerformed = slice.selectors.searchPerformed(state);
    if (!searchPerformed) {
      const searchString = slice.selectors.searchString(state);
      const treeItems = slice.selectors.treeItems(state);
      const flatten = flattenTree(treeItems);
      const searchResult = Object.values(flatten)
        .filter((entity) =>
          entity.name.toLowerCase().includes(searchString.toLowerCase())
        )
        .map((entity) => entity.id);
      dispatch(slice.actions.setSearchResult(searchResult));
      dispatch(slice.actions.setSearchResultIndex(0));
      uncollapseParents(searchResult[0], dispatch, state);
      dispatch(slice.actions.setSelectedEntity(searchResult[0]));
      dispatch(slice.actions.setSearchPerformed(true));
    } else {
      const searchResult = slice.selectors.searchResult(state);
      const searchResultIndex = slice.selectors.searchResultIndex(state);
      const newIndex = (searchResultIndex + 1) % searchResult.length;
      dispatch(slice.actions.setSearchResultIndex(newIndex));
      uncollapseParents(searchResult[newIndex], dispatch, state);
      dispatch(slice.actions.setSelectedEntity(searchResult[newIndex]));
    }
  }
);
