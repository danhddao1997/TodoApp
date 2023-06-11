import {
  StatusSelectionModalProps,
  StatusSelectionModalRefProps,
} from 'models/components/StatusSelectionModal';
import {StatusItem} from 'models/data';
import React, {
  forwardRef,
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
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {STATUS_LIST} from 'utils/constants';

const CategorySelectionModal = forwardRef<
  StatusSelectionModalRefProps,
  StatusSelectionModalProps
>(({hasAll, selectedItem, onItemSelect, onCloseModal}, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      setVisible,
    };
  });

  const {bottom, left, right} = useSafeAreaInsets();

  const listData = useMemo(() => {
    return hasAll ? ['All', ...STATUS_LIST] : STATUS_LIST;
  }, [hasAll]);

  const onPressCloseModal = useCallback(() => {
    setVisible(false);
    onCloseModal?.();
  }, [onCloseModal]);

  const renderItem = useCallback(
    ({item}: {item: string | StatusItem}) => {
      const isAll = typeof item === 'string';
      const iStatus = isAll ? undefined : item.status;

      const onPress = () => onItemSelect(iStatus);

      const isSelected = selectedItem === iStatus;

      const color = isAll ? '#455A64' : item.color;

      return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
          <View style={styles.left}>
            <View style={[styles.circle, {backgroundColor: color}]} />
            <Text style={styles.title}>{isAll ? 'All' : item.title}</Text>
          </View>
          <MaterialIcon
            name="check"
            size={24}
            color={isSelected ? 'tomato' : 'transparent'}
          />
        </TouchableOpacity>
      );
    },
    [onItemSelect, selectedItem],
  );

  const ListHeader = useMemo(
    () => <Text style={styles.listHeaderTitle}>Select status</Text>,
    [],
  );

  return (
    <Modal animationType="slide" visible={visible} transparent>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.background]}
        onPress={onPressCloseModal}
      />
      <FlatList
        data={listData}
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
});

export default CategorySelectionModal;

const styles = StyleSheet.create({
  background: {
    zIndex: -1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  list: {
    flexGrow: 0,
    marginTop: 'auto',
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  circle: {
    width: 16,
    aspectRatio: 1,
    borderRadius: 99,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
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
  },
});
