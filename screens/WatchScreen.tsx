import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

import { WatchHeader } from './watch-components/WatchHeader';
import { StopWatch } from './watch-components/StopWatch';

interface Props {
    endWatch: () => void;
    isOffline: boolean;
    isCreate: boolean;
    roomCode: string;
};

export const WatchScreen: React.FC<Props> = ({ endWatch, isOffline, isCreate, roomCode }) => {
    return(
        <>
            <WatchHeader endWatch={endWatch}/>
            <StopWatch isOffline={true} />
        </>
    );
}