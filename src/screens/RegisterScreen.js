// Firebase - technologia
// Firestore - usługa firebase'a (baza danych)
// Auth - usługa firebase'a (autoryzacja)
//użyć tego pickera: https://github.com/react-native-picker/picker/blob/master/screenshots/picker-android.png
// jakasSuperZmienna - camelCase
// JakasSuperZmienna - PascalCase
// jakas_super_zmienna - kebab case
import React, {useState, createRef, useContext, useEffect} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {SCREEN} from './screens';
import {FIRESTORE_COLLECTION} from '../config';
import {Picker} from '@react-native-picker/picker';
import {UserContext} from '../context/UserContextProvider';

const Roles = [
  {
    title: 'manager ',
  },
  {
    title: 'user ',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.container, backgroundColor]}
  >
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);

const RegisterScreen = ({user, addUser, navigation, StackNavigator}) => {
  const authContext = useContext(UserContext);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('player');
  const [errortext, setErrortext] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const firstNameRef = createRef();
  const lastNameRef = createRef();
  const emailRef = createRef();
  const passwordRef = createRef();
  const confirmPasswordRef = createRef();

  useEffect(() => {
    authContext.methods.setIsDuringAuthProcess(true);
    return () => {
      authContext.methods.setIsDuringAuthProcess(false);
    };
  }, []);

  const onRegisterPress = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    if (
      firstName === '' ||
      lastName === '' ||
      email === '' ||
      password === '' ||
      confirmPassword === ''
    ) {
      alert('Uzupełnij wszystkie pola');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password) //tworzenie u zytkownika autoryzacyjnego (firebase auth)
      .then(response => {
        const uid = response.user.uid; //pobieramy id nowo stworzonego użytkownika
        const data = {
          role: role,
          firstName: firstName,
          lastName: lastName,
        }; //tworzę obiekt wyjściowy dla dokumentu firestore
        //firestore nie powinien przechowywać email and , bo posiada je autoryzacja
        return firestore() //wykonuje się promise, którego rezultat jest zwracany do then
          .collection(FIRESTORE_COLLECTION.USERS)
          .doc(uid)
          .set(data);
      })
      .then(() => {
        console.log('User updated');
        setIsRegistered(true);
        authContext.methods.setIsDuringAuthProcess(false);
      })
      .catch(error => {
        alert(error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <KeyboardAvoidingView enabled>
        <Text style={styles.textStyle}>Rejestracja</Text>
        <SafeAreaView>
          <ScrollView>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => setEmail(text)}
                value={email}
                maxLength={30}
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
                maxLength={10}
                underlineColorAndroid="#f000"
                placeholder="Hasło max 10 znaków"
                placeholderTextColor="#8b9cb5"
                ref={passwordRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() =>
                  confirmPasswordRef.current &&
                  confirmPasswordRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                maxLength={10}
                underlineColorAndroid="#f000"
                placeholder="Powtórz hasło ..."
                placeholderTextColor="#8b9cb5"
                ref={confirmPasswordRef}
                returnKeyType="next"
                secureTextEntry={true}
                onSubmitEditing={() =>
                  firstNameRef.current && firstNameRef.current.focus()
                }
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={firstName => setFirstName(firstName)}
                maxLength={20}
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
                onChangeText={lastName => setLastName(lastName)}
                maxLength={20}
                underlineColorAndroid="#f000"
                placeholder="Nazwisko ..."
                placeholderTextColor="#8b9cb5"
                autoCapitalize="sentences"
                ref={lastNameRef}
                returnKeyType="next"
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
                isRegistered ? undefined : onRegisterPress();
              }}
            >
              <Text style={styles.buttonTextStyle}>ZAREJESTRUJ</Text>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignContent: 'center',
  },

  SectionStyle: {
    flexDirection: 'column',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#3175ab',
    borderWidth: 0,
    color: 'white',
    borderColor: '#3175ab',
    height: 40,
    alignItems: 'center',
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: 'white',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#3175ab',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  pickerStyle: {
    marginLeft: 115,
    marginRight: 35,
    justifyContent: 'center',
    color: 'white',
    height: 40,
    width: 160,
    borderWidth: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  textStyle: {
    color: '#3175ab',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 25,
    alignSelf: 'center',
    padding: 60,
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
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 16,
  },
  container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 18,
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#dadae8',
  },
  flatListStyle: {
    flexDirection: 'row',
  },
});

/*
         <Picker
                selectedValue={role}
                style={{height: 50, width: 150}}
                onValueChange={itemValue => setRole(itemValue)}>
                <Picker.Item label="Kategoria" value="  " />
                <Picker.Item label="Manager" value="manager" />
                <Picker.Item label="User" value="user" />
              </Picker>





              <FlatList
              style={styles.SectionStyle}
              data={Roles}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
              extraData={role}
            /> */
