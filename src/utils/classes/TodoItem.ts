import Realm from 'realm';

class TodoItem extends Realm.Object<TodoItem> {
  id!: Realm.BSON.ObjectId;
  title!: string;
  description?: string;
  priority!: number;
  createdAt!: Date;
  updatedAt!: Date;
  deadline!: Date;
  status!: number;

  static schema = {
    name: 'TodoItem',
    properties: {
      id: {
        type: 'objectId',
        default: () => new Realm.BSON.ObjectID(),
      },
      title: 'string',
      description: 'string?',
      priority: 'int',
      createdAt: 'date',
      updatedAt: 'date',
      deadline: 'date',
      status: 'int',
    },
    primaryKey: 'id',
  };
}

export default TodoItem;
