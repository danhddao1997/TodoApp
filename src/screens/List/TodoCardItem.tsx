import {useNavigation} from '@react-navigation/native';
import {setNavigateType, setUpdatedData} from 'appRedux/stores/List';
import dayjs from 'dayjs';
import {PriorityItem} from 'models/data';
import {ListScreenNavigationProp} from 'models/navigation/screens/List';
import {TodoCardItemProps} from 'models/screens/List';
import {find, propEq} from 'ramda';
import React, {FC, useCallback} from 'react';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {PRIORITY_LIST, STATUS_LIST} from 'utils/constants';
import {convertTodoToReduxTodo} from 'utils/functions';
import {useRootDispatch} from 'utils/hooks/redux';
import {useRealm} from 'utils/realm';

const TodoCardItem: FC<TodoCardItemProps> = ({data, onQuickUpdateStatus}) => {
  const {title, description, status, deadline, priority} = data;

  const {navigate} = useNavigation<ListScreenNavigationProp['navigation']>();

  const dispatch = useRootDispatch();

  const realm = useRealm();

  const todoStatusItem = STATUS_LIST.find(it => it.status === status)!;
  const todoPriorityItem = find<PriorityItem>(propEq(priority, 'priority'))(
    PRIORITY_LIST,
  )!;

  const onNavigateToDetail = useCallback(() => {
    dispatch(setUpdatedData(convertTodoToReduxTodo(data)));
    dispatch(setNavigateType('update'));
    navigate('Detail');
  }, [data, dispatch, navigate]);

  const onPressQuickUpdateStatus = useCallback(() => {
    onQuickUpdateStatus(data);
  }, [data, onQuickUpdateStatus]);

  const onDeleteTodoItem = useCallback(() => {
    Alert.alert('Warning', 'Do you want to delete this item?', [
      {
        text: 'No',
        style: 'default',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          realm.write(() => {
            realm.delete(data);
          });
        },
      },
    ]);
  }, [data, realm]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={onNavigateToDetail}>
      <View style={styles.top}>
        <Text
          style={[styles.title, {color: todoStatusItem.color}]}
          numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.topRight}>
          <View
            style={[
              styles.priorityCircle,
              {backgroundColor: todoPriorityItem.color},
            ]}
          />
          <Text style={styles.priorityLabel}>{todoPriorityItem.title}</Text>
        </View>
      </View>
      <Text style={styles.subtitle} numberOfLines={2}>
        {description ?? 'No description'}
      </Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.dueDate}>
          {`Due date: ${dayjs(deadline).format('MMM D, YYYY')}`}
        </Text>
        <View style={styles.bottomRight}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onPressQuickUpdateStatus}>
            <MaterialCommunityIcon
              size={24}
              color={'tomato'}
              name={'list-status'}
            />
          </TouchableOpacity>
          <View style={styles.space} />
          <TouchableOpacity activeOpacity={0.8} onPress={onDeleteTodoItem}>
            <MaterialIcon size={24} color={'tomato'} name={'delete'} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TodoCardItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',

    flex: 1,
    flexWrap: 'wrap',
    marginRight: 8,
  },
  subtitle: {
    color: '#546E7A',
    marginBottom: 12,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  bottomRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  space: {
    width: 8,
  },
  dueDate: {
    fontSize: 12,
    marginRight: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
  topRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityCircle: {
    width: 14,
    aspectRatio: 1,
    borderRadius: 8,
    marginRight: 4,
  },
  priorityLabel: {
    fontSize: 14,
  },
});
