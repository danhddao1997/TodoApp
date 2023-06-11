import {createRealmContext} from '@realm/react';
import TodoItem from '../classes/TodoItem';

const realmConfig: Realm.Configuration = {
  schema: [TodoItem],
};

export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
