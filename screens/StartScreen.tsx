import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

interface Props {
    beginWatch: () => void;
    setOffline: React.Dispatch<React.SetStateAction<boolean>>;
    setCreate: React.Dispatch<React.SetStateAction<boolean>>;
    setRoomCode: React.Dispatch<React.SetStateAction<string>>;
}


export const StartScreen: React.FC<Props> = ({beginWatch,setOffline,setCreate,setRoomCode}) => {
    return(
        <>
            <Text>START SCREEN</Text>
            <TouchableHighlight onPress={beginWatch}>
                <Text>START</Text>
            </TouchableHighlight>
        </>
    );
}