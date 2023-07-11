import auth from '@react-native-firebase/auth'; /// Przykład

export const loginFireBaseUser = (email, password) =>
  new Promise((resolve, reject) =>
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(credential => {
        resolve(credential.authUser);
      })
      .catch(error => reject('incorrect credentials', error)),
  );

export const signOutFirebaseUser = () => auth().signOut();
