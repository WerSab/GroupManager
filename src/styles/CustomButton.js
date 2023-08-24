import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
export const CustomButton = props => {
  const renderItem = () => {
    return (
      <View>
        <TouchableOpacity style={styles.button} />
      </View>
    );
  };
  return (
    <View>
      <Text>Custom Button</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    //justifyContent: 'center',
    backgroundColor: '#015a92',
  },
  text: {
    color: 'white',
    fontSize: 20,
    padding: 10,
  },
  textDark: {
    color: '#005b98',
    fontSize: 16,
  },
  container: {
    flex: 1,
  },
  listStyle: {
    padding: 20,
    marginBottom: 5,
    color: '#005b98',
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 20,

    textAlign: 'left',
    fontSize: 16,
  },
  linkStyle: {
    color: '#fbb713',
    height: 40,
  },
  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    borderColor: '#005b98',
    height: 40,
    alignItems: 'center',
    borderRadius: 15,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    margin: 10,
  },
  buttonTextStyle: {
    paddingVertical: 10,
    color: '#005b98',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    margin: '10%',
  },
  twoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {height: 70, width: 70, flexBasis: '20%'},
  icon: {height: 30, width: 30, flexBasis: '20%'},
});
