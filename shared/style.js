
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const win = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  button: {
    width: '50%',
    height: 50,
    backgroundColor: '#4280b3',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonLabel: {
    color: 'white'
  },
  text: {
    color: '#4280b3',
    fontSize: 14,
    fontWeight: 'bold'
  },
  h3: {
    color: '#4280b3',
    fontSize: 18,
    fontWeight: 'bold'
  },
  importantText: {
    color: '#9b1a1a',
    fontSize: 14,
    fontWeight: 'bold'
  },
  image: {
    flex: 1,
    alignSelf: 'stretch',
    width: win.width,
    height: win.height,
  }
});
