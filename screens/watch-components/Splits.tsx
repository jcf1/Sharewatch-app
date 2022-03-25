import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';

import { TextFixedWidth } from './TextFixedWidth';

interface Props {
    splits: number[];
    timeToDisplay: (millisec: number) => string;
};

export const Splits: React.FC<Props> = ({ splits, timeToDisplay }) => {
    
    function renderSplit(split: number, index: number) {
        let color: string = ((index % 2) === 0) ? "#ff0000" : "#ffff00";
        return(
            <View style={[styles.split, {backgroundColor: color}]}>
                <View style={{paddingLeft: 5}}>
                    <TextFixedWidth fontSize={25} color={"#000000"}>{"LAP #"+(index+1).toString()}</TextFixedWidth>
                </View>
                <View style={{paddingRight: 5}}>
                <TextFixedWidth fontSize={25} color={"#000000"}>{timeToDisplay(split)}</TextFixedWidth>
                </View>
            </View>
        );
    }

    return(
        <FlatList
            style={styles.splitView}
            data={splits}
            renderItem={({ item, index }) => renderSplit(item, index)}
            keyExtractor={(item, index) => index.toString()}
        />
    );
}

const styles = StyleSheet.create({
    splitView: {
        height: 180,
        maxHeight: 180,
        width: 325,
        backgroundColor: "#ffffff",
    },
    split: {
        flexDirection: 'row',
        height: 28,
        marginBottom: 2,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});