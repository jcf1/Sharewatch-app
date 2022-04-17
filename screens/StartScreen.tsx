import React, {FC, useState} from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableHighlight } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

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
        setCreate(false);
        beginWatch();
        if(code.length === 4) {
            //setRoomCode(code);
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
        <View style={styles.container}>
            <View style={styles.heading}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require('../assets/sharewatch-logo.png')}/>
                </View>
                <Text style={styles.title}>ShareWatch</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.joinView}>
                    <TextInput style={styles.joinInput} placeholder="CODE" autoCapitalize="characters" autoCompleteType="off" maxLength={4} onChangeText={setRoomCode}/>
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
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2B2B2B',
    },
    heading: {
        width: '80%',
        height: '7%', 
        marginBottom: '5%',
        borderBottomWidth: 2,
        borderBottomColor: '#ffffff',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoContainer: {
        width: '20%',
        height: '80%',
        paddingRight: '2%',
    },
    logoImage: {
        flex: 1,
        width: undefined,
        height: undefined,
        resizeMode: 'contain'
    },
    title: {
        textAlign: 'center',
        fontSize: RFPercentage(5.5),
        fontWeight: 'bold',
        color: '#ffffff',
    },
    body: {
        width: '100%',
        height: '45%',
        alignItems: "center",
    },
    joinView: {
        width: '80%',
        height: '20%',
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    joinInput: {
        width: '40%',
        height: '100%',
        backgroundColor: '#ffffff',
        textAlign: "center",
        fontSize: RFPercentage(5.25),
        marginRight: '5%',
        borderWidth: 1,
    },
    joinButton: {
        width: '55%',
        height: '100%',
        backgroundColor: '#3399ff',
        justifyContent: 'center',
        paddingVertical: '5%',
    },
    fullButton: {
        width: '80%',
        height: '20%',
        backgroundColor: '#3399ff',
        justifyContent: 'center',
        marginTop: '5%',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: RFPercentage(3.5),
        fontWeight: 'bold',
        color: '#ffffff',
    },
});