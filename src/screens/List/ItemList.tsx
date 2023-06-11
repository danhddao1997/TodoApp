import {
  setIsQuery,
  setShowFilterStatusModal,
  setUpdatedData,
} from 'appRedux/stores/List';
import {ITodoItem} from 'models/data';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import TodoItem from 'utils/classes/TodoItem';
import {convertTodoToReduxTodo} from 'utils/functions';
import {useRootDispatch, useRootSelector} from 'utils/hooks/redux';
import {useRealm} from 'utils/realm';
import TodoCardItem from './TodoCardItem';

const ListEmptyComponent = () => (
  <Text style={styles.empty}>No items found!</Text>
);

const ItemSeparatorComponent = () => <View style={styles.listSpace} />;

const ItemList = () => {
  const [listItem, setListItem] = useState<ITodoItem[]>([]);

  const filterStatus = useRootSelector(state => state.list.filterStatus);
  const sortAscending = useRootSelector(state => state.list.sortAscending);
  const sortCategory = useRootSelector(state => state.list.sortCategory);

  const dispatch = useRootDispatch();

  const realm = useRealm();

  useEffect(() => {
    let q = realm.objects<TodoItem>(TodoItem.schema.name);

    if (filterStatus != null) {
      q = q.filtered(`status == ${filterStatus}`);
    }

    q =
      sortCategory === 'title'
        ? q.sorted(sortCategory, !sortAscending)
        : q.sorted([
            [sortCategory, !sortAscending],
            ['title', false],
          ]);

    const onItemChanges: Realm.CollectionChangeCallback<TodoItem> = items => {
      setListItem(Array.from(items) as ITodoItem[]);
    };

    q.addListener(onItemChanges);

    return () => {
      q.removeListener(onItemChanges);
    };
  }, [filterStatus, realm, sortAscending, sortCategory]);

  const onQuickUpdateStatus = useCallback(
    (data: ITodoItem) => {
      dispatch(setUpdatedData(convertTodoToReduxTodo(data)));
      dispatch(setIsQuery(false));
      dispatch(setShowFilterStatusModal(true));
    },
    [dispatch],
  );

  const renderItem = useCallback(
    ({item}: {item: ITodoItem}) => {
      return (
        <TodoCardItem data={item} onQuickUpdateStatus={onQuickUpdateStatus} />
      );
    },
    [onQuickUpdateStatus],
  );

  return (
    <FlatList
      style={styles.main}
      contentContainerStyle={styles.contentContainer}
      data={listItem}
      keyExtractor={item => item.id.toHexString()}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  );
};

export default ItemList;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  empty: {
    textAlign: 'center',
  },
  contentContainer: {
    padding: 16,
  },
  listSpace: {
    height: 16,
  },
});
