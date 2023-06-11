import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import {
  DateSelectBottomSheetProps,
  DateSelectBottomSheetRefProps,
} from 'models/screens/Detail';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from 'utils/constants';

const DateSelectBottomSheet = forwardRef<
  DateSelectBottomSheetRefProps,
  DateSelectBottomSheetProps
>(({onUpdateDate}, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [visible, setVisible] = useState(false);

  const {left, right} = useSafeAreaInsets();

  const onOpenDateModal = useCallback(
    (value: Date) => {
      if (isIOS) {
        setSelectedDate(value);
        setVisible(true);
      } else {
        DateTimePickerAndroid.open({
          value,
          onChange: changedDate => {
            onUpdateDate(
              dayjs(changedDate.nativeEvent.timestamp!).endOf('d').toDate(),
            );
          },
          mode: 'date',
          positiveButton: {
            label: 'Select',
          },
        });
      }
    },
    [onUpdateDate],
  );

  useImperativeHandle(ref, () => {
    return {
      onOpenModal: onOpenDateModal,
    };
  });

  const onCloseModal = useCallback(() => {
    setVisible(false);
  }, []);

  const onChangeDate = useCallback((_: any, date?: Date) => {
    setSelectedDate(date);
  }, []);

  const onChooseDate = useCallback(() => {
    onUpdateDate(selectedDate!);
    setVisible(false);
  }, [onUpdateDate, selectedDate]);

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.background]}
        onPress={onCloseModal}
      />
      <View
        style={[styles.container, {paddingLeft: left, paddingRight: right}]}>
        <View style={styles.headerContainer}>
          <View style={styles.side} />
          <Text style={styles.title}>Due date</Text>
          <View style={[styles.side, styles.right]}>
            <TouchableOpacity activeOpacity={0.8} onPress={onChooseDate}>
              <Text style={styles.select}>Select</Text>
            </TouchableOpacity>
          </View>
        </View>
        <DateTimePicker
          onChange={onChangeDate}
          value={selectedDate!}
          mode={'date'}
          display="spinner"
        />
      </View>
    </Modal>
  );
});

export default DateSelectBottomSheet;

const styles = StyleSheet.create({
  background: {
    zIndex: -1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
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
});
