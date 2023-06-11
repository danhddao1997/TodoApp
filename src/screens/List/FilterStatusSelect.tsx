import {
  setFilterStatus,
  setIsQuery,
  setShowFilterStatusModal,
  setUpdatedData,
} from 'appRedux/stores/List';
import StatusSelectionModal from 'components/modals/StatusSelectionModal';
import {StatusSelectionModalRefProps} from 'models/components/StatusSelectionModal';
import {ITodoItem, StatusItem} from 'models/data';
import {find, propEq} from 'ramda';
import React, {useCallback, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {BSON, UpdateMode} from 'realm';
import TodoItem from 'utils/classes/TodoItem';
import {STATUS_LIST} from 'utils/constants';
import {useRootDispatch, useRootSelector} from 'utils/hooks/redux';
import {useRealm} from 'utils/realm';

const FilterStatusSelect = () => {
  const statusSelectionModalRef = useRef<StatusSelectionModalRefProps>(null);

  const filterStatus = useRootSelector(state => state.list.filterStatus);
  const isQuery = useRootSelector(state => state.list.isQuery);
  const updatedData = useRootSelector(state => state.list.updatedData);
  const showFilterStatusModal = useRootSelector(
    state => state.list.showFilterStatusModal,
  );

  const dispatch = useRootDispatch();

  const realm = useRealm();

  const currentStatusData = find<StatusItem>(propEq(filterStatus, 'status'))(
    STATUS_LIST,
  );

  const onPressOpenModal = useCallback(() => {
    dispatch(setIsQuery(true));
    dispatch(setShowFilterStatusModal(true));
  }, [dispatch]);

  const onStatusSelect = useCallback(
    (value?: ITodoItem['status']) => {
      if (isQuery) {
        dispatch(setFilterStatus(value));
      } else {
        realm.write(() => {
          realm.create<TodoItem>(
            TodoItem.schema.name,
            {
              id: BSON.ObjectID.createFromHexString(updatedData!.id),
              status: value!,
            },
            UpdateMode.Modified,
          );
        });

        dispatch(setUpdatedData(undefined));
      }

      dispatch(setShowFilterStatusModal(false));
    },
    [dispatch, isQuery, realm, updatedData],
  );

  const onCloseModal = useCallback(() => {
    dispatch(setShowFilterStatusModal(false));
  }, [dispatch]);

  useEffect(() => {
    statusSelectionModalRef.current?.setVisible(showFilterStatusModal);
  }, [showFilterStatusModal]);

  return (
    <>
      <TouchableOpacity
        style={[
          styles.titleContainer,
          {borderColor: currentStatusData?.color ?? '#455A64'},
        ]}
        activeOpacity={0.8}
        onPress={onPressOpenModal}>
        <Text style={styles.title}>{currentStatusData?.title || 'All'}</Text>
      </TouchableOpacity>
      <StatusSelectionModal
        selectedItem={isQuery ? filterStatus : updatedData?.status}
        ref={statusSelectionModalRef}
        hasAll={isQuery}
        onItemSelect={onStatusSelect}
        onCloseModal={onCloseModal}
      />
    </>
  );
};

export default FilterStatusSelect;

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
  },
  titleContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 0.5,
    minWidth: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
