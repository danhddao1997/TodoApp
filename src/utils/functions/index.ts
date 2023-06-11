import {ITodoItem, ReduxTodoItem} from 'models/data';
import {omit} from 'ramda';

export const convertTodoToReduxTodo = (data: ITodoItem): ReduxTodoItem => {
  return Object.assign(
    omit(['id', 'createdAt', 'updatedAt', 'deadline'], data),
    {
      id: data.id.toHexString(),
      createdAt: data.createdAt.valueOf(),
      updatedAt: data.updatedAt.valueOf(),
      deadline: data.deadline.valueOf(),
    },
  );
};
