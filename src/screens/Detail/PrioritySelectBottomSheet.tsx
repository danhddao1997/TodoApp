import {PriorityItem} from 'models/data';
import {
  PrioritySelectBottomSheetProps,
  PrioritySelectBottomSheetRefProps,
} from 'models/screens/Detail';
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
import {PRIORITY_LIST} from 'utils/constants';

const PrioritySelectBottomSheet = forwardRef<
  PrioritySelectBottomSheetRefProps,
  PrioritySelectBottomSheetProps
>(({onSelectPriority, priority}, ref) => {
  const [visible, setVisible] = useState(false);

  const {bottom, left, right} = useSafeAreaInsets();

  const onOpenModal = useCallback(() => {
    setVisible(true);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      onOpenModal,
    };
  });

  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  const renderItem = useCallback(
    ({item}: {item: PriorityItem}) => {
      const onPress = () => {
        onSelectPriority(item.priority);
        setTimeout(() => setVisible(false), 75);
      };

      const selected = priority === item.priority;

      return (
        <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
          <View style={styles.left}>
            <View style={[styles.circle, {backgroundColor: item.color}]} />
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <MaterialIcon
            name="check"
            size={24}
            color={selected ? 'tomato' : 'transparent'}
          />
        </TouchableOpacity>
      );
    },
    [onSelectPriority, priority],
  );

  const ListHeader = useMemo(
    () => <Text style={styles.listHeaderTitle}>Select priority</Text>,
    [],
  );

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.background]}
        onPress={onCloseModal}
      />
      <FlatList
        data={PRIORITY_LIST}
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

export default PrioritySelectBottomSheet;

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
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
