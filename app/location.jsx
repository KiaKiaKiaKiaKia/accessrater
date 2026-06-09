import { Text, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../firebase.js'
import { ref, get } from 'firebase/database'
import { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import styles from './_styles'


const Location = () => {

  // set variables
  const { locationOption } = useLocalSearchParams();
  const navigation = useNavigation();

  const [locationName, setLocationName] = useState('');

  const images ={
    location1: require('../assets/images/location1.png'),
    location2: require('../assets/images/location2.png'),
    location3: require('../assets/images/location3.png'),
  };

  // function to fetch data from database for display
  async function fetchData( locationOption ) {
  try {
    const dbRef = ref(db, locationOption); 
    const snapshot = await get(dbRef);
    if (snapshot.exists()) {
      const data = snapshot.val(); 
      // store global variables for display
      setLocationName(data.name);
    } else {
      console.log("Doc not found.");
    }
  } catch (error) {
    console.log("ERROR:", error);
  }
}

    useEffect(() => {
      if (locationOption) { //only fetch after option is ready
        fetchData(locationOption);
      }
    }, []);
    
    // to display location name
    useEffect(() => {
      if (locationName) {
        navigation.setOptions({ title: locationName })
      }
    }, [locationName]);

    //push location and location name picked by user to display on later screens
    const pushLocation = async ( locationOption, locationName, reviewOption ) => {
      if (reviewOption === 'user') {
        router.push({
          pathname: '/userReview',
          params: { locationOption, locationName }
        });
      } else {
        router.push({
          pathname: '/aiReview',
          params: { locationOption }
        });
      };
  }

  return (
    <SafeAreaView style={styles.content}>
      
        <Image
        style={styles.image}
        source={images[locationOption]}
        alt='Image of the location.'
        />
        <Text style={styles.smallText}>Image taken from Google Maps.</Text>

        <TouchableOpacity 
        style={styles.button} 
        onPress={() => pushLocation(locationOption, locationName, 'ai')}>
          <Text style={styles.buttonText}>AI review details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        style={styles.button} 
        onPress={() => pushLocation(locationOption, locationName, 'user')}>
          <Text style={styles.buttonText}>User review details</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

export default Location