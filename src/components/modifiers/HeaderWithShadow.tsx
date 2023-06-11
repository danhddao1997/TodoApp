import {Header} from '@react-navigation/elements';
import React, {ComponentProps, FC} from 'react';
import {StyleSheet, View} from 'react-native';

type HeaderProps = ComponentProps<typeof Header>;

const HeaderWithShadow: FC<HeaderProps> = props => {
  return (
    <View style={styles.container}>
      <Header {...props} />
    </View>
  );
};

export default HeaderWithShadow;

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 3,
    zIndex: 1,
    backgroundColor: '#fff',
  },
});
