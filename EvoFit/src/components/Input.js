import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';

const Input = (props) => {
  return (
    <TextInput
          style={styles.input}
          keyboardType='username'
          {...props}
        />
  );
};

const styles = StyleSheet.create({
  input:{
    border:'1 solid #ccc',
    width: '100%',
    height: 50,
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#eee',
   
    
  }
});

export default Input;
