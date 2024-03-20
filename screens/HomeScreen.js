import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

// Helper function to generate time slots from 08:00 to 20:00 with 1-hour 30-minute intervals
const generateTimeSlots = () => {
  const timeSlots = [];
  const startTime = new Date(0);
  startTime.setUTCHours(8);
  startTime.setUTCMinutes(0);

  const endTime = new Date(0);
  endTime.setUTCHours(20);
  endTime.setUTCMinutes(0);

  while (startTime <= endTime) {
    const formattedTime = startTime.toISOString().substr(11, 5);
    timeSlots.push(formattedTime);
    startTime.setUTCMinutes(startTime.getUTCMinutes() + 90);
  }

  return timeSlots;
};

// Generate all days of the week
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Generate the availability data for all days and time slots
const availability = daysOfWeek.map(day => ({
  day,
  times: generateTimeSlots(),
}));

export default function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState(availability[0].day);
  const [selectedTime, setSelectedTime] = useState(availability[0].times[0]);
  const [userEmail, setUserEmail] = useState(null);
  const [houseNumber, setHouseNumber] = useState(null);
  const auth = getAuth();
  const navigation = useNavigation();

  // Function to fetch the user's email after successful login
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user.uid);
  
      // Now fetch the user's data from Firebase Authentication (e.g., email)
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserEmail(currentUser.email);
  
        // Fetch the user's "Name" from Firestore using UID
        const userRef = firestore.collection('users').doc(currentUser.uid);
        const userSnapshot = await userRef.get();
        if (userSnapshot.exists) {
          const userName = userSnapshot.data().Name;
          setHouseNumber(userName); // Update state with the user's name
        }
      }
    } catch (error) {
      console.log('Error logging in:', error);
      alert('Error logging in. Please try again.');
    }
  };

  const [userName, setUserName] = useState(null);

  

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSelectedDay(availability[0].day);
      setUserEmail(null); // Reset the user's email on logout
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.log('Error logging out:', error);
      alert('Error logging out. Please try again.');
    }
  };

  const bookTime = () => {
    // Logic to book time based on selectedDay and selectedTime
    console.log(`Booked ${selectedDay} at ${selectedTime}`);
  };

  useEffect(() => {
    // Check if the user is already logged in (e.g., when the component mounts)
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserEmail(currentUser.email);
    }
  }, []); // Run the effect only once when the component mounts

  return (
    <View style={styles.container}>
      {userEmail && ( // Only display the user's email if it's available
        <>
          <Text style={styles.label}>Logged in as:</Text>
          <Text style={styles.userInfo}>{userEmail}</Text>
        </>
      )}
      

      <Text style={styles.label}>Select Day:</Text>
      <Picker
        selectedValue={selectedDay}
        onValueChange={(itemValue, itemIndex) => setSelectedDay(itemValue)}
        style={styles.picker}
      >
        {availability.map(day => (
          <Picker.Item key={day.day} label={day.day} value={day.day} />
        ))}
      </Picker>

      <Text style={styles.label}>Select Time:</Text>
      <Picker
        selectedValue={selectedTime}
        onValueChange={(itemValue, itemIndex) => setSelectedTime(itemValue)}
        style={styles.picker}
      >
        {availability
          .find(day => day.day === selectedDay)
          .times.map(time => (
            <Picker.Item key={time} label={time} value={time} />
          ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={bookTime}>
        <Text style={styles.buttonText}>Book Time</Text>
      </TouchableOpacity>

      {/* Log out button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#3EB489',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 16,
    color: 'white',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: 'black',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
