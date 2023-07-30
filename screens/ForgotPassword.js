import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const forgetPassword = () => {
    setLoading(true);
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setLoading(false);
        alert("Du har fått en e-post for tilbakestilling av passord");
      })
      .catch((error) => {
        setLoading(false);
        alert("Feil ved tilbakestilling av passord: " + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Glemte Passord</Text>
      <TextInput
        placeholder="Skriv inn din e-postadresse"
        value={email}
        onChangeText={text => setEmail(text)}
        style={styles.input}
      />
      <TouchableOpacity onPress={forgetPassword} style={styles.button}>
        <Text style={styles.buttonText}>Tilbakestill Passord</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Text style={styles.buttonOutlineText}>Gå tilbake til innlogging</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3EB489',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'black',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  goBackButton: {
    marginTop: 20,
  },
  buttonOutlineText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
