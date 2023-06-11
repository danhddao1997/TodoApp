import Realm from 'realm';

export interface ITodoItem {
  id: Realm.BSON.ObjectId;
  title: string;
  description?: string;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
  deadline: Date;
  status: number;
}

export interface ReduxTodoItem
  extends Omit<ITodoItem, 'id' | 'createdAt' | 'updatedAt' | 'deadline'> {
  id: string;
  createdAt: number;
  updatedAt: number;
  deadline: number;
}

export interface StatusItem {
  title: string;
  status: ITodoItem['status'];
  color: string;
}

export interface PriorityItem {
  title: string;
  priority: ITodoItem['priority'];
  color: string;
}

export interface TodoForm {
  title: ITodoItem['title'];
  description: ITodoItem['description'];
  priority: ITodoItem['priority'];
  deadline: ITodoItem['deadline'];
  status?: ITodoItem['status'];
}
