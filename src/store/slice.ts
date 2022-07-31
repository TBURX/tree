import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EntityIcons } from '../bi/constants';
import { Entity } from '../bi/types';
import { ECheckboxState } from '../components/checkbox/types';
import { ITreeItem } from '../components/tree/types';
import { IMap } from '../types';
import { IState } from './types';

const initialState: IState = {
  entities: {},
  checkedEntities: {},
  collapsedEntities: {},
  selectedEntity: null,
  searchString: '',
  searchPerformed: false,
};

const { actions, reducer } = createSlice({
  name: 'treeApp',
  initialState,
  reducers: {
    setEntities(state: IState, { payload }: PayloadAction<Entity[]>) {
      const entities: IMap<Entity> = {};
      payload.forEach((entity) => {
        entities[entity.id] = entity;
      });
      state.entities = entities;
      state.selectedEntity = initialState.selectedEntity;
      state.checkedEntities = initialState.checkedEntities;
      state.collapsedEntities = initialState.collapsedEntities;
    },
    setChecked(
      state: IState,
      { payload }: PayloadAction<{ id: string; checked: boolean }>
    ) {
      const { id, checked } = payload;
      if (!checked) {
        delete state.checkedEntities[id];
        return;
      }
      state.checkedEntities[id] = true;
    },
    setCollapsed(
      state: IState,
      { payload }: PayloadAction<{ id: string; collapsed: boolean }>
    ) {
      const { id, collapsed } = payload;
      if (!collapsed) {
        delete state.collapsedEntities[id];
        return;
      }
      state.collapsedEntities[id] = true;
    },
    setSelectedEntity(state: IState, { payload }: PayloadAction<string>) {
      state.selectedEntity = payload;
    },
    setSearchString(state: IState, { payload }: PayloadAction<string>) {
      state.searchString = payload;
    },
    setSearchPerformed(state: IState, { payload }: PayloadAction<boolean>) {
      state.searchPerformed = payload;
    },
  },
});

// selectors
const entities = (state: IState): IMap<Entity> => state.entities;
const selectedEntityId = (state: IState): string => state.selectedEntity;
const checkedEntityIds = (state: IState): string[] =>
  Object.keys(state.checkedEntities);
const collapsedEntityIds = (state: IState): string[] =>
  Object.keys(state.collapsedEntities);
const searchString = (state: IState): string => state.searchString;
const searchPerformed = (state: IState): boolean => state.searchPerformed;
const isSelected = createSelector(
  [entities, selectedEntityId],
  (entitiesMap, selectedEntityIdent) => (id: string) =>
    id === selectedEntityIdent
);
const isChecked = createSelector(
  [entities, checkedEntityIds],
  (entitiesMap, checkedEntitiesIdents) => (id: string) =>
    checkedEntitiesIdents.includes(id)
);
const isCollapsed = createSelector(
  [entities, collapsedEntityIds],
  (entitiesMap, collapsedEntitiesIdents) => (id: string) =>
    collapsedEntitiesIdents.includes(id)
);
const entity = createSelector(
  [entities],
  (entitiesMap) => (id: string) => entitiesMap[id]
);
const parent = createSelector(
  [entity],
  (entitySelector) => (id: string) => entitySelector(entitySelector(id).parent)
);
const children = createSelector(
  [entities],
  (entitiesMap) => (id: string) =>
    Object.values(entitiesMap).filter((e) => e.parent === id)
);
const convertToTreeItem =
  (state: IState) =>
  (descendants?: Entity[], isParentChecked = false): ITreeItem<Entity>[] => {
    const getChildren = children(state);
    const getIsSelected = isSelected(state);
    const getIsChecked = isChecked(state);
    const getIsCollapsed = isCollapsed(state);
    const result: ITreeItem<Entity>[] = [];
    descendants.forEach((child) => {
      const treeItem: ITreeItem<Entity> = {
        data: child,
        label: child.name,
        icon: EntityIcons[child.type],
        selected: getIsSelected(child.id),
        collapsed: getIsCollapsed(child.id),
      };
      const childDescendants = getChildren(child.id);
      if (childDescendants.length) {
        if (getIsChecked(child.id)) {
          treeItem.checked = ECheckboxState.Checked;
          treeItem.items = convertToTreeItem(state)(childDescendants, true);
        } else {
          treeItem.items = convertToTreeItem(state)(childDescendants);
          const { items } = treeItem;
          const checkedItems = items.filter(
            (it) => it.checked === ECheckboxState.Checked
          );
          if (checkedItems.length === items.length || isParentChecked) {
            treeItem.checked = ECheckboxState.Checked;
          } else if (!checkedItems.length) {
            treeItem.checked = ECheckboxState.Blank;
          } else {
            treeItem.checked = ECheckboxState.Indeterminate;
          }
        }
      } else if (getIsChecked(child.id)) {
        treeItem.checked = ECheckboxState.Checked;
      } else {
        treeItem.checked = ECheckboxState.Blank;
      }
      result.push(treeItem);
    });
    return result;
  };

const treeItems = createSelector(
  [entities, convertToTreeItem],
  (entitiesMap, _convertToTreeItem): ITreeItem<Entity>[] => {
    const noParentEntities = Object.values(entitiesMap).filter(
      (e) => !e.parent
    );
    return _convertToTreeItem(noParentEntities);
  }
);

const selectors = {
  entities,
  parent,
  children,
  treeItems,
  isChecked,
  searchString,
  searchPerformed,
};

export default {
  actions,
  reducer,
  selectors,
};
