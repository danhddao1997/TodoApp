import {mergeDeepRight, omit} from 'ramda';
import React, {ComponentProps, FC, useMemo, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

type TextInputProps = ComponentProps<typeof TextInput>;

type ViewProps = ComponentProps<typeof View>;

const TextInputWithFocus: FC<
  TextInputProps & {
    containerStyle?: ViewProps['style'];
  }
> = props => {
  const [isFocused, setIsFocused] = useState(false);

  const borderColorStyle = useMemo(() => {
    return {borderColor: isFocused ? 'tomato' : '#424242'};
  }, [isFocused]);

  const textInputProps = omit(['containerStyle'], props) as TextInputProps;

  const nextProps = mergeDeepRight(textInputProps, {
    onFocus: e => {
      setIsFocused(true);
      props.onFocus?.(e);
    },
    onBlur: e => {
      setIsFocused(false);
      props.onBlur?.(e);
    },
    style: {
      padding: 0,
      paddingVertical: 0,
      paddingHorizontal: 0,
      paddingTop: 0,
      paddingBottom: 0,
      ...(props.multiline ? styles.multiline : {}),
      ...(props.style as Record<string, unknown>),
    },
  } as TextInputProps) as TextInputProps;

  return (
    <View style={[styles.container, borderColorStyle, props.containerStyle]}>
      <TextInput {...nextProps} />
    </View>
  );
};

export default TextInputWithFocus;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    borderWidth: 0.5,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  multiline: {
    height: '100%',
  },
});
