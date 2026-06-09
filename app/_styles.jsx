import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#fff'
  },
  subContent: {
    flex: 2,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#d6d2c4',
    width: 300,
    padding: 20,
    margin: 30,
    alignItems: 'center',
  },
  header: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#d6d2c4',
    width: 300,
    padding: 5,
    margin: 5,
    alignItems: 'center',
  },
  scrollContent: {
    alignItems: 'center',
  },
  inlineView: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: 'ComicSans-Bold',
    fontSize: 25,
    marginTop: 5,
    color: '#003b49',
  },
  text: {
    fontFamily: 'ComicSans-Regular',
    fontSize: 20,
    color: '#003b49',
  },
    smallText: {
    fontFamily: 'ComicSans-Regular',
    fontSize: 12,
    color: '#003b49',
  },
  boldText: {
    fontFamily: 'ComicSans-Bold',
    fontSize: 20,
    color: '#003b49',
  },
  buttonText: {
    fontFamily: 'ComicSans-Regular',
    fontSize: 20,
    padding: '6%',
    color: '#003b49',
  },
  button: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#d6d2c4',
    margin: 10,
    width: '80%',
    height: '10%',
    alignItems: 'center',
  },
  ratingButton: {
    width: 45,
    height: 45,
  },
  featureButton: {
    width: 300,
    height: 70,
  },
  selectedButton: {
    backgroundColor: '#ffc845',
  },
  image: {
    width: '80%',
    height: 300,
    margin: 10,
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#fff',
    width: '80%',
    height: '10%',
    fontSize: 20,
    margin: 5,
  },
  featureInput: {
    width: '65%',
    height: 60,
  }

})

export default styles;