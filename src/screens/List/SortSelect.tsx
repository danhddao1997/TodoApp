import {toggleSortAscending} from 'appRedux/stores/List';
import assets from 'assets';
import {
  SortCategorySelectModalRefProps,
  SortSelectComponentProps,
} from 'models/screens/List';
import React, {FC, useCallback, useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SORT_CATEGORY_TITLE_MAPPING} from 'utils/constants';
import {useRootDispatch, useRootSelector} from 'utils/hooks/redux';
import SortCategorySelectModal from './SortCategorySelectModal';

const SortSelectComponent: FC<SortSelectComponentProps> = ({
  onSelectCategory,
}) => {
  const sortCategory = useRootSelector(state => state.list.sortCategory);
  const sortAscending = useRootSelector(state => state.list.sortAscending);

  const dispatch = useRootDispatch();

  const img = assets[sortAscending ? 'sort_asc' : 'sort_desc'];

  const sortCategoryTitle = SORT_CATEGORY_TITLE_MAPPING[sortCategory];

  const onToggleSortAscending = useCallback(() => {
    dispatch(toggleSortAscending());
  }, [dispatch]);

  return (
    <View style={styles.main}>
      <TouchableOpacity activeOpacity={0.8} onPress={onSelectCategory}>
        <Text style={styles.title}>{sortCategoryTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.sortButton}
        onPress={onToggleSortAscending}>
        <Image style={styles.image} source={img} />
      </TouchableOpacity>
    </View>
  );
};

const SortSelect = () => {
  const sortCategorySelectModalRef =
    useRef<SortCategorySelectModalRefProps>(null);

  const onOpenModal = useCallback(() => {
    sortCategorySelectModalRef.current?.setVisible(true);
  }, []);

  return (
    <>
      <SortSelectComponent onSelectCategory={onOpenModal} />
      <SortCategorySelectModal ref={sortCategorySelectModalRef} />
    </>
  );
};

export default SortSelect;

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginRight: 2,
  },
  sortButton: {
    width: 20,
    aspectRatio: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
