import {ITodoItem, ReduxTodoItem} from '../../data';

interface ListState {
  filterStatus: ITodoItem['status'] | undefined;
  updatedData: ReduxTodoItem | undefined;
  sortAscending: boolean;
  sortCategory: string;
  isQuery: boolean;
  showFilterStatusModal: boolean;
  navigateType: 'create' | 'update' | undefined;
}

export default ListState;
