import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase' 

const firebase = require('firebase');
require('firebase/firestore');

if(firebase.apps.length){
  firebase.initializeApp({
    // insert firebase credentials here
    apiKey: "AIzaSyDYPLerKjgHCpYQIzvsrxHWoNMfY0kWY3E",
    authDomain: "test-a0508.firebaseapp.com",
    projectId: "test-a0508",
    storageBucket: "test-a0508.appspot.com",  
    messagingSenderId: "371451181680", 
    appId: "1:371451181680:web:3c5ecc81bb4d65bbd592b5", 
    measurementId: "G-X93VVSDWPS"
  });
}

this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
