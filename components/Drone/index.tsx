import React, { useState, useEffect, useRef } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { StyleSheet, View, Button, Text, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

import { Colors } from '../../constants/Colors';

const cello = require('../../assets/sounds/edited-cello-c2.mp3')

export default function Drone() {
    const dronePlayer = useAudioPlayer(cello);
    const backupPlayer = useAudioPlayer(cello);
    const playerStatus = useAudioPlayerStatus(dronePlayer);
    const [isPlaying, setIsPlaying] = useState(false);
    
      
    const startDrone = () => {
        setIsPlaying(true);
        dronePlayer.seekTo(0);
        dronePlayer.play();
    }

    const stopDrone = () => {
        setIsPlaying(false);
        dronePlayer.pause();
    }

    const handleToneChange = () => {}

    useEffect(()=>{
        if(playerStatus?.currentTime > 4.0){
            backupPlayer.play()
            stopDrone();
            startDrone();
        }
    }, [playerStatus])

    return(
        <div style={styles.container}>
            <div style={styles.subtitle}>
                <h2 >Drone</h2>
            </div>

            <div style={styles.content}>
                <div style={styles.keys}>
                    <div style={styles.firstLine}>
                        <div style={styles.toneButton}>A#</div>
                        <div style={styles.noButton}></div>
                        <div style={styles.toneButton}>C#</div>
                        <div style={styles.toneButton}>D#</div>
                        <div style={styles.noButton}></div>
                        <div style={styles.toneButton}>F#</div>
                    </div>
                    <div style={styles.secondLine}>
                        <div style={styles.toneButton}>A</div>
                        <div style={styles.toneButton}>B</div>
                        <div style={styles.activatedToneButton}>C</div>
                        <div style={styles.toneButton}>D</div>
                        <div style={styles.toneButton}>E</div>
                        <div style={styles.toneButton}>F</div>
                        <div style={styles.toneButton}>G</div>

                    </div>
                </div>

                <div style={styles.volumeContainer}>
                    <h3>Volume</h3>
                    <Slider
                        style={{width: 200, height: 40}}
                        minimumValue={0}
                        maximumValue={100}
                        step={1}
                        thumbTintColor={Colors.main}
                        minimumTrackTintColor={Colors.text}
                        maximumTrackTintColor={Colors.text}
                    />
                </div>
            </div>

            <View style={styles.buttonContainer}>
                {!isPlaying ? (
                    <Button 
                    title="Start" 
                    onPress={startDrone} 
                    color={Colors.main}
                    />
                ) : (
                    <Button 
                    title="Stop" 
                    onPress={stopDrone}
                    color={Colors.main} 
                    />
                )}

                <Button 
                    title=" A 440 hz" 
                    onPress={() => {}}
                    color={Colors.secondary} 
                />
            </View>
        </div>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '50%',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    keys:{
        margin: 16,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    firstLine:{
        marginLeft: 0,

        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    secondLine:{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 8,
    },
    toneButton:{
        borderRadius: 5,
        width: 40,
        height: 40,
        backgroundColor: Colors.secondary,
        color: 'white',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noButton:{
        borderRadius: 5,
        width: 40,
        height: 40,
    },
    activatedToneButton:{
        borderRadius: 5,
        width: 40,
        height: 40,
        backgroundColor: Colors.main,
        color: 'white',

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    volumeContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
        gap: 8,
        marginBottom: 16,
        color: Colors.text    
    },
    volumeBar: {
        width: 80,
        height: 6,
        borderRadius: 3,
        backgroundColor: Colors.secondary,
    },
    volumeSlider: {
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: Colors.main,
        cursor: 'pointer',
        boxShadow: '' ,
    },
    buttonContainer:{
        display: 'flex',
        flexDirection: 'row',
        gap: 16,
        margin: 16,
    },
    droneStart:{
        backgroundColor: Colors.main,
        color: 'white',
        borderRadius: 10,
        height: 50,
        width: 100,

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    toneConfig:{
        backgroundColor: Colors.secondary,
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