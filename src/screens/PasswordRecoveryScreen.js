import React, {useState} from 'react';
import {TouchableOpacity, View, Text, StyleSheet, Alert} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

const PasswordRecoveryScreen = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState();
  const [disable, setDisable] = useState(false);

  const showAlertMessage = () =>
    Alert.alert(
      null,
      'Link resetujący hasło wysłano na wprowadzony adres email',
    );

  const recoverPassword = () => {
    setDisable(true);
    if (email.length !== 0) {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          setError(null);
          showAlertMessage();
        })
        .catch(error => {
          console.log(error);
          setError(error.message);
        })
        .finally(() => {
          setDisable(false);
        });
    }
  };

  /* 
            
        2. PO wpisaniu prawidłowego adresu email przez użytkownika i wysłaniu mu linka
        na email, usuwamy błąd ze stanu i nie wyświetlamy go użytkownikowi.


        3.  Ostylować komunikat po błędnym mailu!!
        4. Po wyświetleniu alertu, na którym widnieje przycisk "OK" po jego wciśnięciu nawigujemy spowrotem do ekranu logowania (poprzedniego)

    */

  //tekst error pojawi się dopiero po przerenderowaniu komponentu (nie od raqzu po naciśnięciu button)
  //https://reactjs.org/docs/conditional-rendering.html
  /* let err;
     if(error) {
         err = <Text>{error}</Text>
     }else {
         err = null;
     }*/

  return (
    <View style={styles.mainBody}>
      <View style={styles.SectionStyle}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          underlineColorAndroid="#f000"
          placeholder="Wpisz email ..."
          placeholderTextColor="#8b9cb5"
          autoCapitalize="sentences"
        />
      </View>
      {error ? <Text style={{color: 'white'}}>Blad: {error}</Text> : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={() => {
          recoverPassword();
        }}
      >
        <Text style={styles.buttonTextStyle}>PRZYPOMNIJ HASŁO</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordRecoveryScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#005a98',
    alignContent: 'center',
  },
  inputStyle: {
    flex: 1,
    color: '#005a98',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dadae8',
  },

  buttonStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#015a92',
    paddingVertical: 10,
    fontSize: 16,
  },
  SectionStyle: {
    flexDirection: 'column',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
});

//<Text style={styles.buttonTextStyle}>Przypomij hasło</Text>
