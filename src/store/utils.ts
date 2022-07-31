import { useDispatch as reduxUseDispatch } from 'react-redux';
import { Dispatcher } from './types';

export const useDispatch = () => reduxUseDispatch() as Dispatcher;
