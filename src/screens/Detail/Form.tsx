import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import LoadingModal from 'components/modals/LoadingModal';
import StatusSelectionModal from 'components/modals/StatusSelectionModal';
import TextInputWithFocus from 'components/modifiers/TextInputWithFocus';
import dayjs from 'dayjs';
import {StatusSelectionModalRefProps} from 'models/components/StatusSelectionModal';
import {ITodoItem, ReduxTodoItem, TodoForm} from 'models/data';
import {DetailScreenNavigationProp} from 'models/navigation/screens/Detail';
import {
  DateSelectBottomSheetRefProps,
  DetailFormRefProps,
  PrioritySelectBottomSheetRefProps,
} from 'models/screens/Detail';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Controller, FieldErrors, useForm} from 'react-hook-form';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BSON, UpdateMode} from 'realm';
import TodoItem from 'utils/classes/TodoItem';
import {PRIORITY_LIST, STATUS_LIST} from 'utils/constants';
import {useRootSelector} from 'utils/hooks/redux';
import {useRealm} from 'utils/realm';
import * as yup from 'yup';
import DateSelectBottomSheet from './DateSelectBottomSheet';
import PrioritySelectBottomSheet from './PrioritySelectBottomSheet';

const initialCreateValue: TodoForm = {
  title: '',
  description: '',
  priority: 0,
  deadline: dayjs().endOf('d').toDate(),
};

const schema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .trim()
    .notOneOf([''], 'Title can not be empty'),
  deadline: yup
    .date()
    .required('Due date is required')
    .min(dayjs().endOf('d'), 'Due date must not be before the current day'),
});

const convertDataToFormValue = (data: ReduxTodoItem) => {
  const {title, description, priority, deadline, status} = data;

  return {
    title,
    description,
    priority,
    deadline: new Date(deadline),
    status,
  };
};

const DetailForm = forwardRef<DetailFormRefProps, {}>((_, ref) => {
  const {goBack} = useNavigation<DetailScreenNavigationProp['navigation']>();

  const updatedData = useRootSelector(state => state.list.updatedData);
  const type = useRootSelector(state => state.list.navigateType);

  const realm = useRealm();

  const dateSelectBottomSheetRef = useRef<DateSelectBottomSheetRefProps>(null);
  const prioritySelectBottomSheetRef =
    useRef<PrioritySelectBottomSheetRefProps>(null);
  const statusSelectionModalRef = useRef<StatusSelectionModalRefProps>(null);

  const {control, handleSubmit, setValue} = useForm<TodoForm>({
    defaultValues: updatedData
      ? convertDataToFormValue(updatedData)
      : initialCreateValue,
    resolver: yupResolver(schema),
  });

  const onStatusSelect = useCallback(
    (value: ITodoItem['status'] | undefined) => {
      setValue('status', value);
      statusSelectionModalRef.current?.setVisible(false);
    },
    [setValue],
  );

  const onOpenStatusSelectModal = useCallback(() => {
    statusSelectionModalRef.current?.setVisible(true);
  }, []);

  const onSubmit = (data: TodoForm) => {
    LoadingModal.setVisible(true);
    if (type === 'create') {
      const {title, description, priority, deadline} = data;
      const createDate = new Date();
      realm.write(() => {
        realm.create('TodoItem', {
          title: title.trim(),
          description: description.trim(),
          priority,
          createdAt: createDate,
          updatedAt: createDate,
          deadline,
          status: 0,
        });
      });
    } else if (type === 'update' && updatedData) {
      const {title, description, priority, deadline, status} = data;
      const updateDate = new Date();
      realm.write(() => {
        realm.create<TodoItem>(
          TodoItem.schema.name,
          {
            id: BSON.ObjectID.createFromHexString(updatedData.id),
            title: title.trim(),
            description: description.trim(),
            priority,
            updatedAt: updateDate,
            deadline,
            status,
          },
          UpdateMode.Modified,
        );
      });
    }
    goBack();
    LoadingModal.setVisible(false);
  };

  const onFormError = (errors: FieldErrors<TodoForm>) => {
    const msg =
      errors.title?.message ||
      errors.deadline?.message ||
      'An error has occured';

    Alert.alert('Warning', msg);
  };

  const onUpdateDeadline = useCallback(
    (value: Date) => {
      setValue('deadline', value);
    },
    [setValue],
  );

  useImperativeHandle(ref, () => {
    return {
      onSubmit: () => {
        handleSubmit(onSubmit, onFormError)();
      },
    };
  });

  const renderStatusField = () => {
    return type === 'update' ? (
      <>
        <View style={styles.space} />
        <Controller
          control={control}
          name="status"
          render={({field: {value}}) => {
            const currentStatus = STATUS_LIST.find(it => it.status === value)!;

            return (
              <>
                <Text style={styles.title}>Status</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.rowContainer}
                  onPress={onOpenStatusSelectModal}>
                  <View
                    style={[
                      styles.priorityIndicator,
                      {backgroundColor: currentStatus.color},
                    ]}
                  />
                  <Text style={styles.text}>{currentStatus.title}</Text>
                </TouchableOpacity>
                <StatusSelectionModal
                  selectedItem={value}
                  ref={statusSelectionModalRef}
                  hasAll={false}
                  onItemSelect={onStatusSelect}
                />
              </>
            );
          }}
        />
      </>
    ) : null;
  };

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        style={styles.main}
        contentContainerStyle={styles.contentContainer}>
        <Controller
          control={control}
          name="title"
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <>
                <Text style={styles.title}>Title*</Text>
                <TextInputWithFocus
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Write title"
                />
              </>
            );
          }}
        />
        <View style={styles.space} />
        <Controller
          control={control}
          name="description"
          render={({field: {onChange, onBlur, value}}) => {
            return (
              <>
                <Text style={styles.title}>Description</Text>
                <TextInputWithFocus
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  containerStyle={styles.textBoxContainer}
                  placeholder="Write description"
                />
              </>
            );
          }}
        />
        <View style={styles.space} />
        <Controller
          control={control}
          name="priority"
          render={({field: {onChange, value}}) => {
            const currentPriority = PRIORITY_LIST.find(
              it => it.priority === value,
            )!;

            const onOpenModal = () =>
              prioritySelectBottomSheetRef.current?.onOpenModal();

            return (
              <>
                <Text style={styles.title}>Priority</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.rowContainer}
                  onPress={onOpenModal}>
                  <View
                    style={[
                      styles.priorityIndicator,
                      {backgroundColor: currentPriority.color},
                    ]}
                  />
                  <Text style={styles.text}>{currentPriority.title}</Text>
                </TouchableOpacity>
                <PrioritySelectBottomSheet
                  ref={prioritySelectBottomSheetRef}
                  onSelectPriority={onChange}
                  priority={value}
                />
              </>
            );
          }}
        />
        <View style={styles.space} />
        <Controller
          control={control}
          name="deadline"
          render={({field: {value}}) => {
            const onOpenDateModal = () =>
              dateSelectBottomSheetRef.current?.onOpenModal(value);

            return (
              <>
                <Text style={styles.title}>Due date</Text>
                <TouchableOpacity
                  style={styles.dueDateSelect}
                  onPress={onOpenDateModal}
                  activeOpacity={0.8}>
                  <Text style={[styles.text, styles.date]}>
                    {dayjs(value).format('MMM D, YYYY')}
                  </Text>
                </TouchableOpacity>
              </>
            );
          }}
        />
        {renderStatusField()}
      </ScrollView>
      <DateSelectBottomSheet
        ref={dateSelectBottomSheetRef}
        onUpdateDate={onUpdateDeadline}
      />
    </>
  );
});

export default DetailForm;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
  },
  textBoxContainer: {
    height: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: 'tomato',
    marginBottom: 12,
  },
  space: {
    height: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  priorityIndicator: {
    width: 16,
    aspectRatio: 1,
    borderRadius: 12,
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
  dueDateSelect: {
    alignSelf: 'flex-start',
  },
  date: {
    color: '#007AFF',
  },
});
