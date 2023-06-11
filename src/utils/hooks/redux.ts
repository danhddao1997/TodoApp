import {RootDispatch, RootState} from 'appRedux';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useRootDispatch: () => RootDispatch = useDispatch;
