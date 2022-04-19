import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";


interface Props {
    isOffline: boolean;
    endWatch: () => void;
    code: string;
    users: string[];
};

export const WatchHeader: React.FC<Props> = ({ isOffline, endWatch, code, users }) => {
    return(
        <View style={styles.header}>
            <View style={styles.leftContainer}>
                <TouchableHighlight onPress={endWatch}>
                    <Text style={{textAlign: 'left', fontSize: RFPercentage(3.5), color: 'white'}}>
                        Exit
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={{flex: 1}}>
                {!isOffline && <Text style={{textAlign: 'center', fontSize: RFPercentage(2.75), color: 'white'}}>Code: {code.toUpperCase()}</Text>}
            </View>
            <View style={{flex: 1, paddingRight: '5%'}}>
                {!isOffline && <Text style={{textAlign: 'right', fontSize: RFPercentage(2.75), color: 'white'}}>Users: {users.length}</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#585858',
    },
    leftContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingLeft: '5%',
        width:  '33%',
    }
});