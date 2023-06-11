import {StatusSelectItemProps} from 'models/components/StatusSelectModal';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const StatusSelectItem = ({
  item,
  onItemSelect,
  selectedItem,
}: StatusSelectItemProps) => {
  const isAll = typeof item === 'string';
  const iStatus = isAll ? undefined : item.status;

  const onPress = () => onItemSelect(iStatus);

  const isSelected = selectedItem === iStatus;

  const color = isAll ? '#455A64' : item.color;

  return (
    <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
      <View style={styles.left}>
        <View style={[styles.circle, {backgroundColor: color}]} />
        <Text style={styles.title}>{isAll ? 'All' : item.title}</Text>
      </View>
      <MaterialIcon
        name="check"
        size={24}
        color={isSelected ? 'tomato' : 'transparent'}
      />
    </TouchableOpacity>
  );
};

export default StatusSelectItem;

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
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
});
