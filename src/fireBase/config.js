
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAjh4tbjBUvAT3IM0NgcYVSEk7hxBg1VL4',
  authDomain: 'your-auth-domain-b1234.firebaseapp.com',
  databaseURL: 'https://GroupManager.firebaseio.com',
  projectId: 'groupmanager-39c08',
  storageBucket: 'groupmanager-39c08.appspot.com',
  messagingSenderId: '12345-insert-yourse',
  appId: 'groupmanager-39c08',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };