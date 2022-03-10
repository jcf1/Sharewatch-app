import React, {FC, useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableHighlight} from 'react-native';

interface Props {
    beginWatch: () => void;
    setOffline: React.Dispatch<React.SetStateAction<boolean>>;
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setRoomCode: React.Dispatch<React.SetStateAction<string>>;
}


export const StartScreen: FC<Props> = ({beginWatch,setOffline,setCreate,setRoomCode}) => {
    const [code, setCode] = useState('');

    function joinPress() {

        setRoomCode(code);
        beginWatch();
    }

    function createPress() {
        setCreate(true);
        beginWatch();
    }

    function offlinePress() {
        setOffline(true);
        beginWatch();
    }

    return(
        <View style={styles.body}>
            <View style={styles.heading}>
                <Text style={styles.title}>ShareWatch</Text>
            </View>

            <View>
                <View style={styles.joinView}>
                    <TextInput style={styles.joinInput} placeholder="CODE" autoCapitalize="characters" autoCompleteType="off" maxLength={4}/>
                    <TouchableHighlight style={styles.joinButton}>
                        <Text style={styles.buttonText}>Join Room</Text>
                    </TouchableHighlight>
                </View>
                    <TouchableHighlight style={styles.fullButton}>
                        <Text style={styles.buttonText}>Create Room</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.fullButton}>
                        <Text style={styles.buttonText}>Offline StopWatch</Text>
                    </TouchableHighlight>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2B2B',
    },
    heading: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff'
    },
    title: {
        textAlign: 'center',
        fontSize: 55,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    joinView: {
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    joinInput: {
        backgroundColor: '#ffffff',
        textAlign: "center",
        fontSize: 40,
        minWidth: 145,
        minHeight: 75,
        marginRight:10,
        borderWidth: 1,
    },
    joinButton: {
        backgroundColor: '#3399ff',
        justifyContent: 'center',
        minWidth: 145,
        minHeight: 75,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    fullButton: {
        backgroundColor: '#3399ff',
        justifyContent: 'center',
        minWidth: 300,
        minHeight: 75,
        marginTop: 25,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
    },
});