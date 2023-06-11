import {useNavigation} from '@react-navigation/native';
import {setNavigateType, setUpdatedData} from 'appRedux/stores/List';
import HeaderWithShadow from 'components/modifiers/HeaderWithShadow';
import {ListScreenNavigationProp} from 'models/navigation/screens/List';
import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useRootDispatch} from 'utils/hooks/redux';
import FilterStatusSelect from './FilterStatusSelect';
import ItemList from './ItemList';
import SortSelect from './SortSelect';

const ListScreen = () => {
  const {navigate} = useNavigation<ListScreenNavigationProp['navigation']>();

  const dispatch = useRootDispatch();

  const onAddTodoItem = useCallback(() => {
    dispatch(setUpdatedData(undefined));
    dispatch(setNavigateType('create'));
    navigate('Detail');
  }, [dispatch, navigate]);

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity
        style={styles.right}
        activeOpacity={0.8}
        onPress={onAddTodoItem}>
        <MaterialIcon size={24} color={'tomato'} name={'add'} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.main}>
      <HeaderWithShadow title="To-do List" headerRight={renderHeaderRight} />
      <View style={styles.main}>
        <View style={styles.listHeaderContainer}>
          <SortSelect />
          <FilterStatusSelect />
        </View>
        <ItemList />
      </View>
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  right: {
    marginRight: 12,
  },
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    paddingBottom: 0,
  },
});
