import React, {FC, useState} from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

interface Props {
    endWatch: () => void;
    code?: string;
    isHead?: boolean;
}

/*
{ code ? <Text>Room Code:{code}</Text> : null }
{ isHead ? <Text style={styles.rightContainer}>Head</Text> : null }
*/
export const WatchHeader: React.FC<Props> = ({endWatch, code, isHead}) => {
    return(
        <View style={styles.header}>
            <TouchableHighlight style={styles.leftContainer} onPress={endWatch}>
                <Text style={{textAlign: 'left', fontSize: 20}}>
                    Back
                </Text>
            </TouchableHighlight>
            <Text style={{textAlign: 'right', fontSize: 20}}>Room Code: CODE</Text>
            <Text style={styles.rightContainer}>Head</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'red',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: 10,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        textAlign: 'right',
        paddingRight: 10,
        fontSize: 20,
    },
});