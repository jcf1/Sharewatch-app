import React from 'react';
import { StyleSheet, View } from 'react-native';

interface Props {
    index: number;
    total: number;
};

export const DotIndictor: React.FC<Props> = ({ index, total }) => {

    function createDots() {
        let dots = [];
        for(let i = 0; i < total; i++) {
            dots.push(<View style={[styles.dot, i !== index ? null : styles.selected]} key={i}/>);
        }
        return dots;
    }

    return(
        <View style={styles.dotContainer}>
            {createDots()}
        </View>
    );
}

const styles = StyleSheet.create({
    dotContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#BBBBBB',
        margin: 5,
    },
    selected: {
        backgroundColor: '#FFFFFF',
    }
});