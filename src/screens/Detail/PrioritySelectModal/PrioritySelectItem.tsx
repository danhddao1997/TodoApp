import {PrioritySelectItemProps} from 'models/screens/Detail';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const PrioritySelectItem = ({
  item,
  onPress,
  selectedValue,
}: PrioritySelectItemProps) => {
  const selected = selectedValue === item.priority;

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.left}>
        <View style={[styles.circle, {backgroundColor: item.color}]} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <MaterialIcon
        name="check"
        size={24}
        color={selected ? 'tomato' : 'transparent'}
      />
    </TouchableOpacity>
  );
};
export default PrioritySelectItem;

const styles = StyleSheet.create({
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
  left: {
    flex: 1,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
