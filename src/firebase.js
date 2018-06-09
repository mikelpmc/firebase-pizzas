import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
    apiKey: 'AIzaSyDg7Ijj8okehENXyMRXVL_Tv0fJy7H4JQ0',
    authDomain: 'fir-workshop-pizzas.firebaseapp.com',
    databaseURL: 'https://fir-workshop-pizzas.firebaseio.com',
    projectId: 'fir-workshop-pizzas',
    storageBucket: 'fir-workshop-pizzas.appspot.com',
    messagingSenderId: '200814043334'
});

const db = firebase.firestore();

const settings = { timestampsInSnapshots: true };
db.settings(settings);

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const storage = firebase.storage();

export { db, provider, auth, storage };
