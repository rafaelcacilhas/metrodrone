import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { useAudioPlayer } from 'expo-audio';

import Metronome from './components/Metronome';
import Drone from './components/Drone';

import { Colors } from './constants/Colors';

export default function App() {
  return (
    <View style={styles.container}>        
      <Metronome />
      <Drone />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.slate,

    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
