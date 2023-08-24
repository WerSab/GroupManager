import React, {useContext, useState, createRef, useEffect} from 'react';
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
  SafeAreaView,
} from 'react-native';
import {
  loginFireBaseUser,
  signOutFirebaseUser,
} from '../firebase/authentication-methods';
import {UserContext} from '../context/UserContextProvider';

const LoginScreen = ({navigation}) => {
  const authContext = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogging, setIsLogging] = useState('');
  const [error, setError] = useState(null);

  const passwordInputRef = createRef();

  useEffect(() => {
    authContext.methods.setIsDuringAuthProcess(true);
    return () => {
      authContext.methods.setIsDuringAuthProcess(false);
    };
  }, []);

  const loginUser = () => {
    if (email === '' || password === '') {
      alert('Uzupełnij wszystkie pola');
      return;
    }
    setIsLogging(true);
    loginFireBaseUser(email, password)
      .then(() => {
        setError(null);
        authContext.methods.setIsDuringAuthProcess(false);
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
      <Text style={styles.textStyle}>CKiS w Skawinie</Text>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <SafeAreaView>
          <View>
            <KeyboardAvoidingView enabled>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={event => setEmail(event.nativeEvent.text)}
                  maxLength={30}
                  placeholder="Wpisz email..." //dummy@abc.com
                  placeholderTextColor="#8b9cb5"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() =>
                    passwordInputRef.current && passwordInputRef.current.focus()
                  }
                  underlineColorAndroid="#f000"
                  blurOnSubmit={false}
                />
              </View>
              <View style={styles.SectionStyle}>
                <TextInput
                  style={styles.inputStyle}
                  onChange={event => setPassword(event.nativeEvent.text)}
                  maxLength={10}
                  placeholder="Wpisz hasło..." //12345
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
                  console.log(loginUser);
                }}
              >
                <Text style={styles.buttonTextStyle}>LOGIN</Text>
              </TouchableOpacity>

              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Text style={{color: 'red'}}>{error}</Text>
              </View>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('RegisterScreen')}
              >
                Nie posiadasz loginu? Zarejestruj się!
              </Text>
              <Text
                style={styles.registerTextStyle}
                onPress={() => navigation.navigate('PasswordRecoveryScreen')}
              >
                Zapomniałeś/łaś hasło?
              </Text>
            </KeyboardAvoidingView>
          </View>
        </SafeAreaView>
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
    backgroundColor: '#C5EEFF',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    borderColor: '#005b98',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#005b98',
    borderWidth: 0,
    color: 'white',
    borderColor: '#005b98',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
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
    color: '#005b98',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  registerTextStyle: {
    color: '#005b98',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  textStyle: {
    color: '#005b98',
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
