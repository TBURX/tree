import { useDispatch as reduxUseDispatch } from 'react-redux';
import { Dispatcher } from './types';

/**
 * замена стандартному useDispatch() из-за ошибки:
 * `"Аргумент типа "AsyncThunkAction<void, void, {}>" нельзя назначить параметру типа "AnyAction""`
 */
export const useDispatch = () => reduxUseDispatch() as Dispatcher;
