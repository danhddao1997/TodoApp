import DateTimePicker, {
  DateTimePickerAndroid,
} from '@react-native-community/datetimepicker';
import BackdropModal from 'components/modals/BackdropModal';
import dayjs from 'dayjs';
import {BackdropModalRefProps} from 'models/components/BackdropModal';
import {
  DateSelectBottomSheetProps,
  DateSelectBottomSheetRefProps,
} from 'models/screens/Detail';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {isIOS} from 'utils/constants';

const ForwardedComponent: ForwardRefRenderFunction<
  DateSelectBottomSheetRefProps,
  DateSelectBottomSheetProps
> = ({onUpdateDate}, ref) => {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const {left, right} = useSafeAreaInsets();

  const backdropModalRef = useRef<BackdropModalRefProps>(null);

  const setVisible = useCallback((value: boolean) => {
    backdropModalRef.current?.setVisible(value);
  }, []);

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
    [onUpdateDate, setVisible],
  );

  const onPressCloseModal = useCallback(() => {
    setVisible(false);
  }, [setVisible]);

  useImperativeHandle(ref, () => {
    return {
      onOpenModal: onOpenDateModal,
    };
  });

  const onChangeDate = useCallback((_: any, date?: Date) => {
    setSelectedDate(date);
  }, []);

  const onChooseDate = useCallback(() => {
    onUpdateDate(selectedDate!);
    setVisible(false);
  }, [onUpdateDate, selectedDate, setVisible]);

  return isIOS ? (
    <BackdropModal ref={backdropModalRef} onCloseModal={onPressCloseModal}>
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
    </BackdropModal>
  ) : null;
};

const DateSelectBottomSheet = forwardRef<
  DateSelectBottomSheetRefProps,
  DateSelectBottomSheetProps
>(ForwardedComponent);

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
