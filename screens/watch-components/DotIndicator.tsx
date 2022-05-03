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
        height: '0.0667%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: '6%',
    },
    dot: {
        width: '3%',
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: '#666666',
        margin: '2%',
    },
    selected: {
        backgroundColor: '#f2f2f2',
    }
});