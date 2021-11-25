import React, { useContext, useState, createRef } from 'react';
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
import {
  loginFireBaseUser,
  signOutFirebaseUser,
} from '../fireBase/authentication-methods';
import { UserContext } from '../context/UserContextProvider';
//import RegisterScreen from './RegisterScreen'

const LoginScreen = ({ navigation }) => {

  const authContext = useContext(UserContext);
  // {user, data, initializing} = useContext(UserContext);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState('');
  const [error, setError] = useState(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const passwordInputRef = createRef();

  const loginUser = () => {
    setIsLogging(true);
    loginFireBaseUser(email, password)
      .then(() => {

        setError(null);
      })
      .catch(setError)
      .finally(() => setIsLogging(false));
  };

  /*
    Startowe miejsce w aplikacji na podstawie auth usera nawiguje
     do odpowiedniego screenu: wylogowany -> login screen, zalogowany -> home screen (na przykład) lub od razu sprawdzenie roli użytkownika
      i w zależności od jego roli (firestore data) nawigować do odpowiedniego ekranu (np. ManagerHomeScreen lub PlayerHomeScreen etc).

  */

  /*
    REJESTRAJCA UZYTKOWNIKA:
    WYBOR ROLI:
    Z selecta uzytkownik wybiera sobie role: np. manager, player - podczas rejestracji
    zapisuje wybrana z selecta role do stanu komponentu
    przy kliknieciu w przycisk "REJESTRUJ", przekazuje do bazy danych (firestore) role ze stanu.


  */

  return (
    <View style={styles.mainBody}>
       <Text style={styles.textStyle}>Witamy w aplikacji 
       {'\n'}
          Centrum Kultury i Sportu w Skawinie</Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View>
         
          <KeyboardAvoidingView enabled>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChange={event => setEmail(event.nativeEvent.text)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChange={event => setPassword(event.nativeEvent.text)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              disabled={isLogging}
              title="Log in"
              onPress={() => {
                loginUser();
                console.log(loginUser)
              }}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 10, alignItems: 'center' }}>
              <Text style={{ color: 'red' }}>{error}</Text>
            </View>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('PasswordRecoveryScreen')}>
              Forgot password?
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

/*
player: x@x.pl zaqwsx
manager: y@y.pl zaqwsx

*/

export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    borderColor: '#3175ab',
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
    borderRadius: 30,
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
    borderRadius: 30,
    borderColor: '#3175ab',
  },
  registerTextStyle: {
    color: '#3175ab',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
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
});
