import BackdropModal from 'components/modals/BackdropModal';
import {BackdropModalRefProps} from 'models/components/BackdropModal';
import {SortCategorySelectModalRefProps} from 'models/screens/List';
import {keys} from 'ramda';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SORT_CATEGORY_TITLE_MAPPING} from 'utils/constants';
import SortCategorySelectItem from './SortCategorySelectItem';

const filterCategories = keys(SORT_CATEGORY_TITLE_MAPPING) as string[];

const SortCategorySelectModal = forwardRef<SortCategorySelectModalRefProps, {}>(
  (_, ref) => {
    const {bottom, left, right} = useSafeAreaInsets();

    const backdropModalRef = useRef<BackdropModalRefProps>(null);

    const setVisible = useCallback((value: boolean) => {
      backdropModalRef.current?.setVisible(value);
    }, []);

    const onCloseModal = useCallback(() => {
      setVisible(false);
    }, [setVisible]);

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
        return (
          <SortCategorySelectItem category={item} onCloseModal={onCloseModal} />
        );
      },
      [onCloseModal],
    );

    const keyExtractor = useCallback((item: string) => item, []);

    return (
      <BackdropModal ref={backdropModalRef} onCloseModal={onCloseModal}>
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
      </BackdropModal>
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
