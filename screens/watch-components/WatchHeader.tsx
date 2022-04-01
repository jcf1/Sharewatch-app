import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

interface Props {
    isOffline: boolean;
    endWatch: () => void;
    code: string;
    isHead: boolean;
};

/*
{ code ? <Text>Room Code:{code}</Text> : null }
{ isHead ? <Text style={styles.rightContainer}>Head</Text> : null }
*/
export const WatchHeader: React.FC<Props> = ({ isOffline, endWatch, code, isHead }) => {
    return(
        <View style={styles.header}>
            <View style={styles.leftContainer}>
                <TouchableHighlight onPress={endWatch}>
                    <Text style={{textAlign: 'left', fontSize: 20, color: 'white'}}>
                        Back
                    </Text>
                </TouchableHighlight>
            </View>
            {isOffline ? null : <Text style={{textAlign: 'right', fontSize: 20, color: 'white'}}>Room Code: {code.toUpperCase()}</Text>}
            {isOffline || !isHead ? null : <Text style={styles.rightContainer}>Head</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#585858',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
        width: 50,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'right',
        paddingRight: 10,
        fontSize: 20,
        color: 'white',
    },
});