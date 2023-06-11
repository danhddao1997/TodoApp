import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import ListState from 'models/appRedux/stores/List';

const initialState: ListState = {
  filterStatus: undefined,
  updatedData: undefined,
  sortAscending: true,
  sortCategory: 'title',
  isQuery: true,
  showFilterStatusModal: false,
  navigateType: undefined,
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setFilterStatus: (
      state,
      action: PayloadAction<ListState['filterStatus']>,
    ) => {
      state.filterStatus = action.payload;
    },
    setUpdatedData: (
      state,
      action: PayloadAction<ListState['updatedData']>,
    ) => {
      state.updatedData = action.payload;
    },
    setSortAscending: (
      state,
      action: PayloadAction<ListState['sortAscending']>,
    ) => {
      state.sortAscending = action.payload;
    },
    toggleSortAscending: state => {
      state.sortAscending = !state.sortAscending;
    },
    setSortCategory: (
      state,
      action: PayloadAction<ListState['sortCategory']>,
    ) => {
      state.sortCategory = action.payload;
    },
    setIsQuery: (state, action: PayloadAction<ListState['isQuery']>) => {
      state.isQuery = action.payload;
    },
    setShowFilterStatusModal: (
      state,
      action: PayloadAction<ListState['showFilterStatusModal']>,
    ) => {
      state.showFilterStatusModal = action.payload;
    },
    setNavigateType: (
      state,
      action: PayloadAction<ListState['navigateType']>,
    ) => {
      state.navigateType = action.payload;
    },
  },
});

const listReducer = listSlice.reducer;

export const {
  setFilterStatus,
  setUpdatedData,
  setSortAscending,
  setSortCategory,
  toggleSortAscending,
  setIsQuery,
  setShowFilterStatusModal,
  setNavigateType,
} = listSlice.actions;
export default listReducer;
