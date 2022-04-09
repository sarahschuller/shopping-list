import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase' 

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      lists: [],
      uid: 0,
      loggedInText: 'Please wait, you are getting logged in',
    }; 

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

this.referenceShoppinglistUser = null;
}

onCollectionUpdate = (querySnapshot) => {
  const lists = [];
  // go through each document
  querySnapshot.forEach((doc) => {
    // get the QueryDocumentSnapshot's data
    let data = doc.data();
    lists.push({
      name: data.name,
      items: data.items.toString(),
    });
  });
  this.setState({ 
    lists,
 });
}

addList() { 
  // add a new list to the collection
  this.referenceShoppingLists.add({
    name: 'TestList',
    items: ['eggs', 'pasta', 'veggies'],
    uid: this.state.uid,
  });
}

render() {
  
  return (
    <View style={styles.container}>

      <Text>{this.state.loggedInText}</Text>

      <Text style={styles.text}>All Shopping lists</Text>
      <FlatList
          data={this.state.lists}
          renderItem={({ item }) => 
            <Text style={styles.item}>{item.name}: {item.items}</Text>}
        />

      <Button 
        onPress={() => {
          this.addList();
        }}
        title = "Add something"
      />
    </View>
  );
}

componentDidMount() {
  // creating a references to shoppinglists collection
  this.referenceShoppingLists = firebase.firestore().collection('shoppinglists');
  
  // listen to authentication events
  this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
    if (!user) {
      await firebase.auth().signInAnonymously();
    }
    //update user state with currently active user data
    this.setState({
      uid: user.uid,
      loggedInText: 'Hello there',
    });

    // create a reference to the active user's documents (shopping lists)
    this.referenceShoppinglistUser = firebase.firestore().collection('shoppinglists').where("uid", "==", this.state.uid);
    // listen for collection changes for current user 
    this.unsubscribeListUser = this.referenceShoppinglistUser.onSnapshot(this.onCollectionUpdate);

    

  });
}

componentWillUnmount() {
  // stop listening to authentication
  this.authUnsubscribe();
  // stop listening for changes
  this.unsubscribeListUser();
}
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  paddingTop: 40,      
},
item: {
  fontSize: 20,
  color: 'blue',
},
text: {
  fontSize: 30,
}
});

export default App;