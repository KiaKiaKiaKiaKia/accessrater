import { Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { useFonts } from 'expo-font'

const RootLayout = () => {

  //load custom font from assets (Comic Sans)
  const [fontsLoaded] = useFonts({
    'ComicSans-Regular': require('../assets/fonts/Comic-Sans-MS-Regular.ttf'),
    'ComicSans-Bold': require('../assets/fonts/Comic-Sans-MS-Bold.ttf')
  })

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack screenOptions={{
        headerStyle: {
          backgroundColor: '#d6d2c4',
        },
        headerTintColor: 'black',
        headerTitleStyle: {
          fontFamily: 'ComicSans-Regular',
          color: '#003b49',
        }, 
    }}>
        <Stack.Screen name="index" options={{title: 'Choose a location'}} />
        <Stack.Screen name="location" options={{title: 'Location'}} />
        <Stack.Screen name="userReview" options={{title: 'User Reviews'}} />
        <Stack.Screen name='aiReview' options={{title: 'AI Review'}} />
        <Stack.Screen name="createReview" options={{title: 'Write a review'}} />
    </Stack>
  )
}

export default RootLayout



