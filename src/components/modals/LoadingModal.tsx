import {LoadingModalRefProps} from 'models/components/LoadingModal';
import React, {
  createRef,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';

const loadingModalRef = createRef<LoadingModalRefProps>();

const LoadingModalComponent = forwardRef<LoadingModalRefProps, {}>((_, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      setVisible,
    };
  });

  return (
    <Modal visible={visible} transparent>
      <View style={styles.container}>
        <ActivityIndicator size={'large'} color={'#fff'} />
      </View>
    </Modal>
  );
});

const LoadingModal = () => {
  return <LoadingModalComponent ref={loadingModalRef} />;
};

export default Object.assign(LoadingModal, {
  setVisible: (value: boolean) => loadingModalRef.current?.setVisible(value),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
