import {setSortCategory} from 'appRedux/stores/List';
import {SortCategorySelectionItemProps} from 'models/screens/List';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SORT_CATEGORY_TITLE_MAPPING} from 'utils/constants';
import {useRootDispatch, useRootSelector} from 'utils/hooks/redux';

const SortCategorySelectItem = ({
  category,
  onCloseModal,
}: SortCategorySelectionItemProps) => {
  const sortCategory = useRootSelector(state => state.list.sortCategory);
  const dispatch = useRootDispatch();

  const isSelected = sortCategory === category;

  const onPress = () => {
    dispatch(setSortCategory(category));
    onCloseModal();
  };

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <Text style={styles.left}>{SORT_CATEGORY_TITLE_MAPPING[category]}</Text>
      <MaterialIcon
        name="check"
        size={24}
        color={isSelected ? 'tomato' : 'transparent'}
      />
    </TouchableOpacity>
  );
};

export default SortCategorySelectItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    fontSize: 16,
  },
});
