import React  from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Text,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    KeyboardAvoidingView,
    Button,
  } from 'react-native';
  
    const Main = ({navigation}) => {
    
      return (
        <View style={styles.mainBody}>
          <Text>Hello</Text>
        </View>
      );
    }
      
  export default Main;
  
  const styles = StyleSheet.create({
    mainBody: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#1a112b',
      alignContent: 'center',
    }}
    );
  