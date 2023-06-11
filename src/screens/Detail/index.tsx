import {useNavigation} from '@react-navigation/native';
import HeaderWithShadow from 'components/modifiers/HeaderWithShadow';
import {DetailScreenNavigationProp} from 'models/navigation/screens/Detail';
import {DetailFormRefProps} from 'models/screens/Detail';
import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useRootSelector} from 'utils/hooks/redux';
import DetailForm from './Form';

const DetailScreen = () => {
  const {goBack} = useNavigation<DetailScreenNavigationProp['navigation']>();

  const type = useRootSelector(state => state.list.navigateType);

  const formRef = useRef<DetailFormRefProps>(null);

  const headerTitle = useMemo(() => {
    switch (type) {
      case 'create':
        return 'Create To-do';
      case 'update':
        return 'Update To-do';
      default:
        return '';
    }
  }, [type]);

  const renderHeaderLeft = useCallback(() => {
    const onPress = () => goBack();

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.left}>
        <MaterialIcon name="arrow-back-ios" size={24} color={'tomato'} />
      </TouchableOpacity>
    );
  }, [goBack]);

  const renderHeaderRight = useCallback(() => {
    const onPress = () => {
      if (type === 'create' || type === 'update') {
        formRef.current?.onSubmit();
      }
    };

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={styles.right}>
        <MaterialIcon name="check" size={24} color={'tomato'} />
      </TouchableOpacity>
    );
  }, [type]);

  return (
    <View style={styles.main}>
      <HeaderWithShadow
        title={headerTitle}
        headerLeft={renderHeaderLeft}
        headerRight={renderHeaderRight}
      />
      <DetailForm ref={formRef} />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  left: {
    marginLeft: 12,
  },
  right: {
    marginRight: 12,
  },
});
