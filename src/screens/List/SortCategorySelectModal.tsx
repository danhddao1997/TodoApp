import {setSortCategory} from 'appRedux/stores/List';
import {
  SortCategorySelectionItemProps,
  SortCategorySelectModalRefProps,
} from 'models/screens/List';
import {equals, keys} from 'ramda';
import React, {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SORT_CATEGORY_TITLE_MAPPING} from 'utils/constants';
import {useRootDispatch, useRootSelector} from 'utils/hooks/redux';

const filterCategories = keys(SORT_CATEGORY_TITLE_MAPPING) as string[];

const CategoryItem = memo(
  ({category, onCloseModal}: SortCategorySelectionItemProps) => {
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
  },
  (prev, curr) => equals(prev, curr),
);

const SortCategorySelectModal = forwardRef<SortCategorySelectModalRefProps, {}>(
  (_, ref) => {
    const [visible, setVisible] = useState(false);

    const {bottom, left, right} = useSafeAreaInsets();

    const onCloseModal = useCallback(() => {
      setVisible(false);
    }, []);

    useImperativeHandle(ref, () => {
      return {
        setVisible,
      };
    });

    const ListHeader = useMemo(
      () => <Text style={styles.listHeaderTitle}>Select category</Text>,
      [],
    );

    const renderItem = useCallback(
      ({item}: {item: string}) => {
        return <CategoryItem category={item} onCloseModal={onCloseModal} />;
      },
      [onCloseModal],
    );

    const keyExtractor = useCallback((item: string) => item, []);

    return (
      <Modal animationType="slide" transparent visible={visible}>
        <Pressable
          style={[StyleSheet.absoluteFill, styles.background]}
          onPress={onCloseModal}
        />
        <FlatList
          data={filterCategories}
          keyExtractor={keyExtractor}
          style={styles.list}
          contentContainerStyle={{
            paddingBottom: bottom,
            paddingLeft: left,
            paddingRight: right,
          }}
          bounces={false}
          renderItem={renderItem}
          ListHeaderComponent={ListHeader}
        />
      </Modal>
    );
  },
);

export default SortCategorySelectModal;

const styles = StyleSheet.create({
  background: {
    zIndex: -1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    marginTop: 'auto',
    backgroundColor: '#fff',
  },
  list: {
    flexGrow: 0,
    marginTop: 'auto',
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    shadowColor: '#616161',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  side: {
    flexBasis: 0,
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
  },
  right: {
    alignItems: 'flex-end',
  },
  select: {
    color: '#007AFF',
    fontSize: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  listHeaderTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    paddingVertical: 16,
    backgroundColor: '#fff',
    shadowColor: '#616161',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    fontSize: 16,
  },
});
