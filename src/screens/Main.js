import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Main = () => {
  return (
    <View style={styles.mainBody}>
      <Text>Home Screen</Text>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#1a112b',
    alignContent: 'center',
  },
});
