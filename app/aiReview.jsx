import { Text, View, Image } from 'react-native'
import { useLocalSearchParams} from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import sendImageToBackend from './_helpers.jsx'
import styles from './_styles'


const AiReview = () => {

  // set variables
  const { locationOption, locationName } = useLocalSearchParams();

  const [features, setFeatures] = useState([]);
  const [score, setScore] = useState(null);

  const images ={
    location1: require('../assets/images/location1.png'),
    location2: require('../assets/images/location2.png'),
    location3: require('../assets/images/location3.png'),
  };

  // function to get prediction from ai
  const handlePrediction = async (image) => {
    try {
      const result = await sendImageToBackend(image);

      // get features
      const featuresList = result.predictions.map(p => p.class) || [];
      setFeatures(featuresList)

      // calculate score
      let newScore = 2;
      for (const feature of featuresList) {
        if (feature === 'Stairs') {
          newScore -= 2;
        } else if (feature === 'Ramp') {
          newScore += 2;
        } else if (feature === 'Accessible_parking') {
          newScore += 1;
        }
      };
      if (newScore < 1) {
        newScore = 1; // minimum score is 1 star
      } else if (newScore > 5) {
        newScore = 5 // maximum score is 5 stars
      };
      setScore(newScore)

      // catch errors
    } catch (error) {
        console.error('Error:', error);
    }
  };

  useEffect(() => {
  if (locationOption)  { 
      handlePrediction(images[locationOption]);
    }
  }, [locationOption]);

  return (
    <SafeAreaView style={styles.content}>
      <Image
        style={styles.image}
        source={images[locationOption]}
        alt='Image of the location.'
      />

      <Text style={styles.smallText}>Please note: AI is not always 100% accurate.</Text>
      <Text style={styles.smallText}>Please take this review as a baseline of the locations accessibility.</Text>

      <View style={styles.subContent}>
        <Text style={styles.title}>AI rates {locationName}:</Text>
        <Text style={styles.text}>{score} stars</Text>
        <Text style={styles.title}>{"⭐".repeat(score)}</Text>
        <Text style={styles.title}>Features:</Text>
        {(features || {}).map((feature, index) => (
          <Text key={index} style={styles.text}>{feature}</Text>
        ))}
      </View>
      
    </SafeAreaView>
  )
}

export default AiReview