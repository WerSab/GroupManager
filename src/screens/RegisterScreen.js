import React, {useState, createRef} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '../../firebase/config';

import {Picker} from '@react-native-picker/picker';
import LoginScreen from './LoginScreen';
import {StackNavigator} from '../navigation/StackNavigator';

const RegisterScreen = ({user, addUser, navigation, StackNavigator}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  const clearInputs = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const data = {
                    id: uid,
                    email,
                    firstName,
                    lastName,
                };
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        navigation.navigate('Main', {user: data})
                    })
                    .catch((error) => {
                        alert(error)
                    });
            })
            .catch((error) => {
                alert(error)
        });

  };

  return (
    <View style={{flex: 1, backgroundColor: '#1a112b'}}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={text => setFirstName(text)}
            value={firstName}
            underlineColorAndroid="#f000"
            placeholder="Imię ..."
            placeholderTextColor="#8b9cb5"
            ref={firstNameRef}
            autoCapitalize="sentences"
            returnKeyType="next"
            onSubmitEditing={() =>
              lastNameRef.current && lastNameRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={text => setLastName(text)}
            value={lastName}
            underlineColorAndroid="#f000"
            placeholder="Nazwisko ..."
            placeholderTextColor="#8b9cb5"
            autoCapitalize="sentences"
            ref={lastNameRef}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current && emailRef.current.focus()}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={text => setEmail(text)}
            value={email}
            underlineColorAndroid="#f000"
            placeholder="Email ..."
            placeholderTextColor="#8b9cb5"
            keyboardType="email-address"
            ref={emailRef}
            returnKeyType="next"
            onSubmitEditing={() =>
              passwordRef.current && passwordRef.current.focus()
            }
            blurOnSubmit={false}
          />
        </View>

        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={text => setPassword(text)}
            value={password}
            underlineColorAndroid="#f000"
            placeholder="Hasło ..."
            placeholderTextColor="#8b9cb5"
            ref={passwordRef}
            returnKeyType="next"
            secureTextEntry={true}
            blurOnSubmit={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}
            underlineColorAndroid="#f000"
            placeholder="Powtórz hasło ..."
            placeholderTextColor="#8b9cb5"
            ref={confirmPasswordRef}
            returnKeyType="next"
            secureTextEntry={true}
            blurOnSubmit={false}
          />
        </View>

        {errortext != '' ? (
          <Text style={styles.errorTextStyle}>{errortext}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => {
            onRegisterPress();
            clearInputs();
          }}>
          <Text style={styles.buttonTextStyle}>REGISTER</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Already got an account?{' '}
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Log in
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#FCA542',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
});
