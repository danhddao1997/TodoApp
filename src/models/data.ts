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

export interface ReduxTodoItem {
  id: string;
  title: string;
  description?: string;
  priority: number;
  createdAt: number;
  updatedAt: number;
  deadline: number;
  status: number;
}

export interface StatusItem {
  title: string;
  status: number;
  color: string;
}

export interface PriorityItem {
  title: string;
  priority: number;
  color: string;
}

export interface TodoForm {
  title: string;
  description: string;
  priority: number;
  deadline: Date;
  status?: number;
}
