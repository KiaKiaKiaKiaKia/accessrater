import { Text, View, FlatList, TouchableOpacity } from 'react-native'
import { router, useLocalSearchParams} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../firebase.js'
import { ref, get } from 'firebase/database'
import { useEffect, useState } from 'react'
import styles from './_styles'


const UserReview = () => {

  // set variables
  const { locationOption } = useLocalSearchParams();
  const [reviews, setReviews] = useState([]);
  const [userStars, setUserStars] = useState(null);

  // function to fetch data from database
  async function fetchData( locationOption ) {
    try {

      const dbRef = ref(db, `${locationOption}/user_rating`);
      const snapshot = await get(dbRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val(); 
        const reviewsArray = Object.keys(data).map(key => ({ //object to array
          id: key, //use key as id
          ...data[key]
        }));

        // store global reviews variable for display
        setReviews(reviewsArray);

        // calculate average stars for user reviews
        const totalStars = reviewsArray.reduce((sum, review) => {
          const stars = Number(review.stars) || 0;
            return sum + stars;
        }, 0);

        const averageStars = reviewsArray.length > 0 ? totalStars / reviewsArray.length : 0;
        const roundedStars = Math.round(averageStars * 10) / 10 // round to 1 d.p.
        setUserStars(roundedStars);
      } else {
        setUserStars(0); //if no user reviews yet
        setReviews([]); 
      }
      
    } catch (error) {
      console.error("ERROR:", error);
    }
  }

  useEffect(() => {
    if (locationOption)  { //only fetch after option is ready
      fetchData(locationOption);
    }
  }, [locationOption]);

  //push location option picked by user to display on later screens
  const pushLocation = async ( locationOption ) => {
    router.push({
      pathname: '/createReview',
      params: { locationOption } 
    });
  }

  return (
    <SafeAreaView style={styles.content}>
      <View style={styles.header}>
        <Text style={styles.boldText}>Average user rating:</Text>
        <Text style={styles.text}>{userStars} stars</Text>
        <Text style={styles.text}>{"⭐".repeat(userStars)}</Text>
      </View>
      
      <FlatList
        data = {reviews}
        keyExtractor = {(item) => item.id}
        renderItem = {({ item }) => (
          <View style={styles.subContent}>
            <Text style={styles.title}>{item.user_name || item.name} rates:</Text>
            <Text style={styles.title}>{"⭐".repeat(item.stars)}</Text>
            <Text style={styles.text}>{item.stars} stars</Text>
            <Text style={styles.title}>Features:</Text>
            {Object.values(item.features || {}).map((feature, index) => (
              <Text key={index} style={styles.text}>{feature}</Text>
            ))}
          </View>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => pushLocation(locationOption)}>
        <Text style={styles.buttonText}>Create a Review</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default UserReview
