import {
  BackdropModalProps,
  BackdropModalRefProps,
} from 'models/components/BackdropModal';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';
import {Modal, Pressable, StyleSheet} from 'react-native';

const BackdropModal = forwardRef<BackdropModalRefProps, BackdropModalProps>(
  ({onCloseModal, children}, ref) => {
    const [visible, setVisible] = useState(false);

    useImperativeHandle(ref, () => {
      return {
        setVisible,
      };
    });

    const onPressCloseModal = useCallback(() => {
      setVisible(false);
      onCloseModal?.();
    }, [onCloseModal]);

    return (
      <Modal animationType="slide" visible={visible} transparent>
        <Pressable
          style={[StyleSheet.absoluteFill, styles.background]}
          onPress={onPressCloseModal}
        />
        {children}
      </Modal>
    );
  },
);

export default BackdropModal;

const styles = StyleSheet.create({
  background: {
    zIndex: -1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
