import firebase from 'firebase/app';
import 'firebase/storage';

const config = {
  apiKey: 'AIzaSyAoR1vkXG85QhFStEmMBo2JhFzMsEaCmfQ',
  authDomain: 'data-anator.firebaseapp.com',
  databaseURL: 'https://data-anator.firebaseio.com',
  projectId: 'data-anator',
  storageBucket: 'data-anator.appspot.com',
  messagingSenderId: '540345676407',
  appId: '1:540345676407:web:c5cb4348697e3651d9cc72',
  measurementId: 'G-K4KNRN0FSW',
};

firebase.initializeApp(config);

const storage = firebase.storage();

export {
  storage, firebase as default,
};
