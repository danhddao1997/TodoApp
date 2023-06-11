import {configureStore} from '@reduxjs/toolkit';
import listReducer from './stores/List';

const store = configureStore({
  reducer: {
    list: listReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
