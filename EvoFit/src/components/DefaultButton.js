import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const DefaultButton = ({ children, width, bgColor, onPress, underlayColor }) => {
  return (
    <TouchableOpacity
      style={[styles.defaultButton, { width: width || 'auto', backgroundColor: bgColor || 'auto' }]}
      onPress={onPress}
      underlayColor={underlayColor || 'transparent'}
    >
      <View>{children}</View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  defaultButton: {
    padding: 10,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DefaultButton;
