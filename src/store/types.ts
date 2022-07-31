import { Action, AnyAction } from '@reduxjs/toolkit';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Entity } from '../bi/types';
import { IMap } from '../types';

export interface IState {
  entities: IMap<Entity>;
  selectedEntity: string;
  checkedEntities: IMap<boolean>;
  collapsedEntities: IMap<boolean>;
  searchString: string;
  searchPerformed: boolean;
}

export type TypedThunk<T = void> = ThunkAction<T, IState, unknown, Action>;
export type Dispatcher = ThunkDispatch<IState, unknown, AnyAction>;
