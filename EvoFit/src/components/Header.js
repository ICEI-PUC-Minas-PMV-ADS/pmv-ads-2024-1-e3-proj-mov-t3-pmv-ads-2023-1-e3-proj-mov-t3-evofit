import React from 'react';
import { Appbar } from 'react-native-paper';

const Header = ({ title, goBack, children }) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#f2f2f2' }}>
      {
        goBack && 
        <Appbar.BackAction onPress={goBack} />}

      <Appbar.Content title={title} />
      {children}
    </Appbar.Header>
  );
};

export default Header;
