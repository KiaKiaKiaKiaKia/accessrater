import {  Text, View, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native'
import {  useLocalSearchParams } from 'expo-router'
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { db } from '../firebase.js'
import { ref, get, set } from 'firebase/database'
import { useState } from 'react'
import styles from './_styles'


const CreateReview = () => {

  // set variables
  const { locationOption } = useLocalSearchParams();
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [stars, setStars] = useState(null);
  const [features, setFeatures] = useState([]);
  const [allFeatures, setAllFeatures] = useState(['Ramp', 'Stairs', 'Accessible Parking']);
  const [customFeature, setCustomFeature] = useState('');

  // feature selection toggling
  const toggleFeature = (feature) => {
    if (features.includes(feature)) {
      // remove if selected
      setFeatures(features.filter(f => f !== feature));
    } else {
      // add if not selected
      setFeatures([...features, feature]);
    }
  };

  // add custom feature to features list
  const addCustomFeature = (customFeature) => {
    if (customFeature && !allFeatures.includes(customFeature)) {
      setAllFeatures([...allFeatures, customFeature]); // add to state
      setCustomFeature(''); // clear input
    }
  };

  // send review to database
  const submitReview = async (locationOption, name, stars, features) => {
    if (!name || !stars || features.length === 0) {
      Alert.alert(
        'Incomplete Review',
        'Please fill in all fields before submitting.',
        [{text: 'OK'}]
      );
      return;
    } 
    try {
      const dbRef = ref(db, locationOption); 
      const snapshot = await get(dbRef);

      let reviews = {};
      if (snapshot.exists()) {
        reviews = snapshot.val().user_rating || {};
      }

      // determine review id
      const reviewIds = Object.keys(reviews)
        .filter(key => key.startsWith('user_review_')) //reviews are stored as user_review_1, user_review_2, ...
        .map(key => parseInt(key.replace('user_review_', ''), 10));

      const nextId = reviewIds.length > 0 ? Math.max(...reviewIds) + 1 : 1;
      const newReviewKey = `user_review_${nextId}`;

      // create review object
      const reviewObj = {
        id: nextId,
        user_name: name,
        stars,
        features,
      };

      // add new review 
      await set(ref(db, `${locationOption}/user_rating/${newReviewKey}`), reviewObj);
      console.log(`Review ${newReviewKey} added successfully.`);

      // send user to location page
      pushLocation();

    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  //push location option along with user back to index and reset stack 
  const pushLocation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'index' }]
    });
  };

  return (
    <SafeAreaView style={styles.content}>

        <Text style={styles.title}>Give your name:</Text>
        <TextInput 
        placeholder='Enter name' 
        style={styles.input}
        value={name}
        onChangeText={setName}
        />

        <Text style={styles.title}>Give your rating:</Text>
        <View style={styles.inlineView}>
          {[1,2,3,4,5].map(num => (
            <View key={num}>
              <TouchableOpacity 
              onPress={() => setStars(num)} 
              style={[
                styles.button, 
                styles.ratingButton, 
                stars === num && styles.selectedButton]} //highlight selected button
              ><Text style={styles.title}>{num}</Text></TouchableOpacity>
            </View>
          ))}
        </View>
        

        <Text style={styles.title}>Features (good or bad):</Text>
        <ScrollView
          style={{ maxHeight: 300}}
          contentContainerStyle={styles.scrollContent}
        >
          {allFeatures.map((feature) => {
            const featureSelected = features.includes(feature);
            return (
              <TouchableOpacity
              key={feature}
              style={[
                styles.button,
                styles.featureButton,
                featureSelected && styles.selectedButton,
              ]}
              onPress={() => toggleFeature(feature)}
              >
                <Text style={styles.buttonText}>
                  {feature}
                </Text>
              </TouchableOpacity>
            )
          })}
        </ScrollView>

        <View style={styles.inlineView}>
          <TextInput 
          placeholder='Add a custom feature'
          style={[styles.input, styles.featureInput]}
          value={customFeature}
          onChangeText={setCustomFeature}
          />
          <TouchableOpacity 
          style={[styles.button, styles.ratingButton]} 
          onPress={() => addCustomFeature(customFeature)}>
            <Text style={styles.title}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
        style={styles.button} 
        onPress={() => submitReview(locationOption, name, stars, features)}>
          <Text style={styles.buttonText}>Submit Review</Text>
        </TouchableOpacity>

    </SafeAreaView>
  )
}

export default CreateReview

