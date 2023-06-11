import BackdropModal from 'components/modals/BackdropModal';
import {BackdropModalRefProps} from 'models/components/BackdropModal';
import {PriorityItem} from 'models/data';
import {
  PrioritySelectModalProps,
  PrioritySelectModalRefProps,
} from 'models/screens/Detail';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PRIORITY_LIST} from 'utils/constants';
import PrioritySelectItem from './PrioritySelectItem';

const PrioritySelectModal = forwardRef<
  PrioritySelectModalRefProps,
  PrioritySelectModalProps
>(({onSelectPriority, priority}, ref) => {
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

  const renderItem = useCallback(
    ({item}: {item: PriorityItem}) => {
      const onPress = () => {
        onSelectPriority(item.priority);
        setTimeout(() => setVisible(false), 75);
      };

      return (
        <PrioritySelectItem
          selectedValue={priority}
          onPress={onPress}
          item={item}
        />
      );
    },
    [onSelectPriority, priority, setVisible],
  );

  const ListHeader = useMemo(
    () => <Text style={styles.listHeaderTitle}>Select priority</Text>,
    [],
  );

  return (
    <BackdropModal ref={backdropModalRef} onCloseModal={onCloseModal}>
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
    </BackdropModal>
  );
});

export default PrioritySelectModal;

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
