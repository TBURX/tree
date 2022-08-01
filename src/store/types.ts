import { AnyAction } from '@reduxjs/toolkit';
import { ThunkDispatch } from 'redux-thunk';
import { Entity } from '../bi/types';
import { IMap } from '../types';

export interface IState {
  entities: IMap<Entity>;
  selectedEntity: string;
  checkedEntities: IMap<boolean>;
  collapsedEntities: IMap<boolean>;
  searchString: string;
  searchPerformed: boolean;
  searchResult: string[];
  searchResultIndex: number;
}

export type Dispatcher = ThunkDispatch<IState, unknown, AnyAction>;
