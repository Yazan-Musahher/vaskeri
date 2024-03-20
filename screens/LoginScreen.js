import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity, Image, Animated, Easing } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  
  const spinValue = useRef(new Animated.Value(0)).current;

  const singIn = async () => {
    setLoading(true);
    try {
      // Add a delay of 1 second (1000 milliseconds) before starting the animation
      
        spinValue.setValue(0); // Reset the spinValue to 0 before starting the animation
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start();

      const respons = await signInWithEmailAndPassword(auth, email, password);
      console.log(respons);

      // Add an additional delay of 1 second (1000 milliseconds) before navigating to HomeScreen
      setTimeout(() => {
        navigation.navigate('HomeScreen');
      }, 500);

    } catch (error) {
      console.log(error);
      alert('Pålogging mislyktes: ' + "Bruker navn eller passord stemmer ikke");
    } finally {
      setLoading(false);
    }
  }

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.extraSection}>
        <Text style={styles.extraText}>Velkommen til Fjell Vaskeri</Text>
      </View>
      <Animated.Image
        source={require('../assets/washing-machine.png')}
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Bruker navn"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={singIn} style={styles.button}>
          <Text style={styles.buttonText}>Log inn</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.buttonOutline}>
          <Text style={styles.buttonOutlineText}>Glemte Passord?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3EB489',
  },

  image: {
    width: 100,
    height: 75,
    marginBottom: 25,
  },

  extraSection: {
    marginTop: 20,
    alignItems: 'center',
  },
  extraText: {
    fontSize: 25,
    fontWeight: 'bold',
    position: 'absolute',
    top: -120,
  },

  inputContainer: {
    width: '80%',
    marginBottom: 60,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
