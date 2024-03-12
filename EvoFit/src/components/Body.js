import React from 'react';
import { StyleSheet, View} from 'react-native';

const Body = ({children}) =>{
return <View style={styles.container}>{children}</View>


};

const styles = StyleSheet.create({
container: {
  flex:1,
  backgoundColor: '#f6f6f6',
  margin: 8,
   marginLeft: 30,
    marginRight: 30,
},

});

export default Body;