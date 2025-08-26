import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import { useAudioPlayer } from 'expo-audio';


import BeatViewer from '../BeatViewer';
import { Colors } from '../../constants/Colors';

const hihat = require('../../assets/sounds/hihat.mp3');
const bassdrum = require('../../assets/sounds/bassdrum.mp3');


export default function Metronome() {
  const metronomePlayer = useAudioPlayer(bassdrum);

  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);
  let intervalRef = useRef(0);

  const [beatCount, setBeatCount] = useState(1);
  const [timeSignature, setTimeSignature] = useState(4);

  const intervalTime = 60000/bpm;

  const startMetronome = () => {
    if(isPlaying) return;

    setIsPlaying(true);
    setBeatCount(1);

    metronomePlayer.play();

    intervalRef.current = setInterval(() => {
      setBeatCount( prevBeat => {
        const nextBeat = (prevBeat % timeSignature) + 1;
        if(nextBeat === 1){
          metronomePlayer.replace(bassdrum)
        }
        else{
          metronomePlayer.replace(hihat)
        }
        metronomePlayer.seekTo(0);
        metronomePlayer.play();
        return nextBeat;
      });
    }, intervalTime) as any;
  }

  const stopMetronome = () => {
    setIsPlaying(false);
    if(intervalRef.current){
      clearInterval(intervalRef.current);
      intervalRef.current = 0;
    }
    metronomePlayer.pause();
  }

  const handleBpmClick = (step: number) =>{
    setBpm((prev) => {return prev + step} )
  }

  const handleTimeSignatureClick = (step: number) =>{
    setTimeSignature((prev) => {return prev + step} )
  }

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if(isPlaying && intervalRef.current) {
      stopMetronome();
      startMetronome();
    }
  }, [bpm])

  useEffect(() => {
    if(isPlaying && intervalRef.current) {
      stopMetronome();
      startMetronome();
    }
  }, [timeSignature])



  return (
      <View style={styles.container}>
          <View style={styles.subtitle}>
            <h2 >Metronome</h2>
          </View>

          <View style={styles.content}>
            <Text style={styles.bpmText}> {bpm} </Text>
            <Text style={styles.bpmTag}> bpm </Text>

            <BeatViewer beatCount={beatCount} timeSignature={timeSignature} />

            <View style={styles.buttonContainer}>
              <div>
                <button onClick={(event) => {handleBpmClick(1)}}> + </button>
                <button onClick={(event) => {handleBpmClick(-1)}}> - </button>
              </div>

              <div>
                <button onClick={(event) => {handleTimeSignatureClick(1)}}> + </button>
                <button onClick={(event) => {handleTimeSignatureClick(-1)}}> - </button>
              </div>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            {!isPlaying ? (
              <Button 
                title="Start" 
                onPress={startMetronome} 
                color={Colors.main}
              />
            ) : (
              <Button 
                title="Stop" 
                onPress={stopMetronome}
                color={Colors.main} 
              />
            )}
            <Button 
              title="Tap" 
              onPress={()=>{}}
              color={Colors.secondary} 
            />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '50%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,


  },
  subtitle: {
    color: Colors.main,
    margin: 16,
  },
  content:{
    margin: 16,
    minHeight: 300,
    minWidth: 300,


    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  bpmText: {
    fontSize: 80,
    fontWeight: 200,
    color: Colors.text,
  },
  bpmTag:{
    fontSize: 18,
    textTransform:'uppercase',
    letterSpacing: 3,
    color: Colors.text,

    marginBottom: 40,
  },
  buttonContainer: {
    width: 200,
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ffffffff'
  },
  button:{
      backgroundColor: Colors.main,
      color: 'white',
      borderRadius: 10,
      height: 50,
      width: 100,

      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
  }
});
