import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState, useContext} from 'react';
import eventPhoto from '../assets/photos/events.png';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import {SCREEN} from '../navigation/screens';
import {FlatGrid} from 'react-native-super-grid';
import signedOut from '../assets/icons/signedOut.png';
import {UserContext} from '../context/UserContextProvider';
import {signOutFirebaseUser} from '../firebase/authentication-methods';
import {RENDER_ITEM_PHOTOS} from '../styles/RenderItemPhotos';

//napisać  wspólną funkcję w screen do player tab i manager tab
const SCREEN_TAB = Object.values(SCREEN.MANAGER_TAB).map(element => {
  return {
    name: element,
  };
});

const ManagerScreen = () => {
  const navigation = useNavigation();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const currentUser = useContext(UserContext);
  const renderItem = (item, index) => {
    const photo = RENDER_ITEM_PHOTOS(item);

    return (
      <View style={[styles.itemContainer]}>
        <ImageBackground source={photo} style={styles.image}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(item.name);
            }}
          >
            <Text style={styles.itemName}>{item.name}</Text>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    );
  };
  return (
    <>
      {/*<CustomHeader/>*/}
      <View style={styles.mainBody}>
        <View style={styles.buttonContainer}>
          <Text style={styles.text}>
            {currentUser.data.firstName} {currentUser.data.lastName}
            {'\n'}
            {currentUser.data.role}
          </Text>
          <TouchableOpacity
            onPress={
              isSigningOut
                ? undefined
                : () => {
                    setIsSigningOut(true);
                    signOutFirebaseUser();
                  }
            }
          >
            <Image style={styles.icon} source={signedOut} />
          </TouchableOpacity>
        </View>
        <FlatGrid
          itemDimension={130}
          data={SCREEN_TAB}
          style={styles.gridView}
          renderItem={({item, index}) => renderItem(item, index)}
        />
      </View>
    </>
  );
};

export default ManagerScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#C5EEFF',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5EEFF',
    width: '100%',
  },
  text: {
    color: '#005b98',
    fontSize: 25,
    padding: 30,
  },
  icon: {
    padding: 15,
    height: 30,
    width: 30,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 15,
    margin: 10,
  },
  gridView: {
    marginTop: 20,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 150,
  },
  itemName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    fontWeight: '600',
  },
  image: {
    elevation: 20,
    shadowColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
