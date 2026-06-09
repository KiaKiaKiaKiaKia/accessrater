import { Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../firebase.js'
import { ref, get } from 'firebase/database'
import { useEffect, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import styles from './_styles'


const Index = () => {

  const [locations, setLocations] = useState([]);

  // function to fetch data from database for display
  async function fetchData( ) {
  try {

    // call database
    const dbRef = ref(db); 
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val(); 
   
      //format data
      const formattedData = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }))

      // store global variables for display
      setLocations(formattedData);
    } else {
      console.log("Doc not found.");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
}
  useEffect(() => {
      fetchData();
  }, []);

  //push location option picked by user to display on later screens
  const pushLocation = async ( locationOption ) => {

    router.push({ // use push instead of replace to keep back button from layout
      pathname: '/location',
      params: { locationOption } 
    });
  }

  return (
    <SafeAreaView style={styles.content}>
      {locations.map(loc => (
        <TouchableOpacity 
        key={loc.id}
        style={styles.button} 
        onPress={() => pushLocation(loc.id)}>
          <Text style={styles.buttonText}>{loc.name}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  )
}

export default Index

