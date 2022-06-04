import React, {FC, useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Image, TextInput, TouchableHighlight, Switch } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";

interface Props {
    beginWatch: () => void;
    setOffline: React.Dispatch<React.SetStateAction<boolean>>;
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setRoomCode: React.Dispatch<React.SetStateAction<string>>;
    leftMode: boolean;
    setLeftMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const StartScreen: FC<Props> = ({beginWatch, setOffline, setCreate, setRoomCode, leftMode, setLeftMode}) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const styles = createStyles(width, height);

    const [code, setCode] = useState('');

    function joinPress() {
        setOffline(false);
        setCreate(false);
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
        <View style={styles.container}>
            <View style={styles.heading}>
                <View style={styles.logoContainer}>
                    <Image style={styles.logoImage} source={require('../assets/sharewatch-logo.png')}/>
                </View>
                <Text style={styles.title}>ShareWatch</Text>
            </View>

            <View style={styles.body}>
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
                    <Text style={styles.buttonText}>Offline Stopwatch</Text>
                </TouchableHighlight>
                <View style={styles.switchView}>
                    <Text style={styles.switchText}>Left-Handed Button Layout: </Text>
                    <Switch
                        trackColor={{ false: "#a4a4a4", true: "#4d9078" }}
                        ios_backgroundColor={"#a4a4a4"}
                        thumbColor={"#f4f3f4"}
                        onValueChange={() => {setLeftMode(leftMode=> !leftMode)}}
                        value={leftMode}
                    />
                </View>
            </View>
        </View>
    );
}

const createStyles = (width: number,height: number) => StyleSheet.create({
    container: {
        height: height,
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
        justifyContent: 'center',
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
        backgroundColor: '#409FF1',
        justifyContent: 'center',
    },
    fullButton: {
        width: '80%',
        height: '20%',
        backgroundColor: '#409FF1',
        justifyContent: 'center',
        marginTop: '5%',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: RFPercentage(3.5),
        fontWeight: 'bold',
        color: '#ffffff',
    },
    switchView: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    switchText: {
        textAlign: 'center',
        fontSize: RFPercentage(2.5),
        color: '#ffffff',
    }
});