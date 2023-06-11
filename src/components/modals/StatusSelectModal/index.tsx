import {BackdropModalRefProps} from 'models/components/BackdropModal';
import {
  StatusSelectModalProps,
  StatusSelectModalRefProps,
} from 'models/components/StatusSelectModal';
import {StatusItem} from 'models/data';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {FlatList, StyleSheet, Text} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {STATUS_LIST} from 'utils/constants';
import BackdropModal from '../BackdropModal';
import StatusSelectItem from './StatusSelectItem';

const ForwardedComponent: ForwardRefRenderFunction<
  StatusSelectModalRefProps,
  StatusSelectModalProps
> = ({hasAll, selectedItem, onItemSelect, onCloseModal}, ref) => {
  const backdropModalRef = useRef<BackdropModalRefProps>(null);

  const {bottom, left, right} = useSafeAreaInsets();

  const listData = useMemo(() => {
    return hasAll ? ['All', ...STATUS_LIST] : STATUS_LIST;
  }, [hasAll]);

  const setVisible = useCallback((value: boolean) => {
    backdropModalRef.current?.setVisible(value);
  }, []);

  useImperativeHandle(ref, () => {
    return {
      setVisible,
    };
  });

  const onPressCloseModal = useCallback(() => {
    setVisible(false);
    onCloseModal?.();
  }, [onCloseModal, setVisible]);

  const renderItem = useCallback(
    ({item}: {item: string | StatusItem}) => {
      return (
        <StatusSelectItem
          item={item}
          onItemSelect={onItemSelect}
          selectedItem={selectedItem}
        />
      );
    },
    [onItemSelect, selectedItem],
  );

  const ListHeader = useMemo(
    () => <Text style={styles.listHeaderTitle}>Select status</Text>,
    [],
  );

  return (
    <BackdropModal ref={backdropModalRef} onCloseModal={onPressCloseModal}>
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
    </BackdropModal>
  );
};

const StatusSelectModal = forwardRef<
  StatusSelectModalRefProps,
  StatusSelectModalProps
>(ForwardedComponent);

export default StatusSelectModal;

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
    marginTop: 'auto',
    backgroundColor: '#fff',
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
});
