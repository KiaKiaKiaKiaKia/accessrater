import { Image as RNImage, Platform } from 'react-native'

// function to send images to backend for AI predictions
const sendImageToBackend = async (image) => {
  try {
    // resolve asset URI
    const asset = RNImage.resolveAssetSource(image);
    const uri = Platform.OS === 'android' ? asset.uri : asset.uri.replace('file://', '');

    const formData = new FormData();
    formData.append('file', {
      uri,
      name: 'photo.png',
      type: 'image/png',
    });

    // send to backend - change ip address on line below 
    const backendResponse = await fetch(`http://0.0.0.0:5000/predict`, {
      method: 'POST',
      body: formData,
    });

    // avoid crash if response not JSON 
    const text = await backendResponse.text();
    console.log("RAW RESPONSE:", text);
    const prediction = JSON.parse(text);
    return prediction

  } catch (error) {
    console.error('Error sending image to backend:', error);
    throw error;
  }
};

export default sendImageToBackend;
