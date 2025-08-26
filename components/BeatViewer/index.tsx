import { StyleSheet, View, Button, Text, TextInput } from 'react-native';

import { Colors } from '../../constants/Colors';

type BeatViewerProps = {
    beatCount: number,
    timeSignature: number,
}

const BeatViewer = ({beatCount, timeSignature}:BeatViewerProps) => {
    const beats = Array.from({ length: timeSignature }, (_, index) => index + 1);
    return (
        <View style={styles.beatContainer}>
            {beats.map((beat, index) => {
                const beatStyle = beat === beatCount? styles.activeBeat : styles.beat
                return (
                 <div style={beatStyle} />
                )
            })}
        </View>
    )
}

export default BeatViewer;

const styles = StyleSheet.create({
    beatContainer:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    beat:{
        borderWidth: 1,
        backgroundColor: '#555555',
        minHeight: 50,
        width: 10,
    },
    activeBeat:{
        borderWidth: 1,
        backgroundColor: Colors.main,
        minHeight: 50,
        width: 10,
    }
});