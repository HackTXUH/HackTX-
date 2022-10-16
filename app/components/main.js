import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

function listen() {
  console.log('listening');
}

export function Main() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Click the mic to start listening
      </Text>
      <TouchableOpacity onPress={listen}>
        <Image style={styles.logo} source={require('../assets/microphone.svg')} />
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 200,
    width: 200,
  }
});
