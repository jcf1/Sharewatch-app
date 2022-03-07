import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

interface Props {
    endWatch: () => void;
    isOffline: boolean;
    isCreate: boolean;
    roomCode: string;
}

export const WatchScreen: React.FC<Props> = ({endWatch,isOffline,isCreate,roomCode}) => {
    return(
        <>
            <Text>WATCH SCREEN</Text>
            <TouchableHighlight onPress={endWatch}>
                <Text>BACK</Text>
            </TouchableHighlight>
        </>
    );
}