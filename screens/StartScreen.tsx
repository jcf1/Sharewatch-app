import React, {FC, useState} from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableHighlight } from 'react-native';

interface Props {
    beginWatch: () => void;
    setOffline: React.Dispatch<React.SetStateAction<boolean>>;
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setRoomCode: React.Dispatch<React.SetStateAction<string>>;
};

export const StartScreen: FC<Props> = ({beginWatch,setOffline,setCreate,setRoomCode}) => {
    const [code, setCode] = useState('');

    function joinPress() {
        setOffline(false);
        if(code.length === 4) {
            setRoomCode(code);
            beginWatch();
        }
    }

    function createPress() {
        setOffline(false);
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
                <View style={{paddingRight: 10}}>
                    <Image style={styles.logoImage} source={require('../assets/sharewatch-logo.png')}/>
                </View>
                <Text style={styles.title}>ShareWatch</Text>
            </View>

            <View>
                <View style={styles.joinView}>
                    <TextInput style={styles.joinInput} placeholder="CODE" autoCapitalize="characters" autoCompleteType="off" maxLength={4} onChangeText={setCode}/>
                    <TouchableHighlight style={styles.joinButton} onPress={joinPress}>
                        <Text style={styles.buttonText}>Join Room</Text>
                    </TouchableHighlight>
                </View>
                    <TouchableHighlight style={styles.fullButton} onPress={createPress}>
                        <Text style={styles.buttonText}>Create Room</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.fullButton} onPress={offlinePress}>
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
        borderBottomColor: '#ffffff',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    logoImage: {
        height: 40,
        width: 60,
    },
    title: {
        textAlign: 'center',
        fontSize: 45,
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