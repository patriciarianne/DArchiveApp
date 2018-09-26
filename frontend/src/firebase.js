import firebase from 'firebase'
import 'firebase/firestore'

const config = {
  apiKey: "AIzaSyArFgz4eFZdHOgN1Bu_64458xqUEP_NdY8",
  authDomain: "darchive-b60c1.firebaseapp.com",
  databaseURL: "https://darchive-b60c1.firebaseio.com",
  projectId: "darchive-b60c1",
  storageBucket: "darchive-b60c1.appspot.com",
  messagingSenderId: "1077256267110"
};

firebase.initializeApp(config);

const db = firebase.firestore()
db.settings({
  timestampsInSnapshots: true
})

const collection = collectionName => db.collection(collectionName)

export { firebase, collection }