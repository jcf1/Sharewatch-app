import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, Dimensions } from 'react-native';

import { TextFixedWidth } from './TextFixedWidth';
import { DotIndictor } from './DotIndicator';

interface Props {
    laps: number[];
    splits: number[];
    timeToDisplay: (millisec: number) => string;
};

export const Splits: React.FC<Props> = ({ laps, splits, timeToDisplay }) => {

    const width = Math.floor(Dimensions.get('window').width * 0.9);
    const height = Math.floor(Dimensions.get('window').height * 0.34);
    const styles = createStyles(width, height);

    const scrollRef = useRef<ScrollView>(null);
    const lapsRef = useRef<FlatList<number>>(null);
    const splitsRef = useRef<FlatList<number>>(null);

    const [scrollIndex,setScrollIndex] = useState(0);

    useEffect(() => {
        if(laps.length > 0) {
            lapsRef?.current?.scrollToIndex({ index: 0 });
            splitsRef?.current?.scrollToIndex({ index: 0 });
            setScrollIndex(0);
        }
    }, [laps,splits]);
    
    function renderLap(lap: number, index: number) {
        let color: string = ((index % 2) === 0) ? "#2E2E2E" : "#6E6E6E";
        return(
            <View style={[styles.split, {backgroundColor: color}]}>
                <TextFixedWidth fontSize={3.5} color={"#FFFFFF"} paddingLeft={width*0.02}>{"LAP "+(index+1).toString()}</TextFixedWidth>
                <TextFixedWidth fontSize={3.5} color={"#FFFFFF"} paddingRight={width* 0.02}>{timeToDisplay(lap)}</TextFixedWidth>
            </View>
        );
    }

    function renderSplit(split: number, index: number) {
        let color: string = ((index % 2) === 1) ? "#2E2E2E" : "#6E6E6E";
        return(
            <View style={[styles.split, {backgroundColor: color}]}>
                <TextFixedWidth fontSize={3.5} color={"#FFFFFF"} paddingLeft={width * 0.02}>{"SPLIT "+(index+1).toString()}</TextFixedWidth>
                <TextFixedWidth fontSize={3.5} color={"#FFFFFF"} paddingRight={width * 0.02}>{timeToDisplay(split)}</TextFixedWidth>
            </View>
        );
    }

    return(
        <View style={styles.container}>
            <View style={styles.splitContainer}>
                <ScrollView 
                    horizontal={true}
                    decelerationRate={0}
                    snapToInterval={width}
                    disableIntervalMomentum={true}
                    onScroll={(e) => setScrollIndex(Math.floor(e.nativeEvent.contentOffset.x / width))}
                    scrollEventThrottle={0}
                    snapToAlignment={"center"}
                    showsHorizontalScrollIndicator={false}
                >
                    <View>
                        <FlatList
                            ref={lapsRef}
                            data={laps}
                            renderItem={({ item, index }) => renderLap(item, laps.length - 1 - index)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View>
                        <FlatList
                            ref={splitsRef}
                            data={splits}
                            renderItem={({ item, index }) => renderSplit(item, splits.length - 1 - index)}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </ScrollView>
            </View>
            <DotIndictor index={scrollIndex} total={2}/>
        </View>
    );
}

const createStyles = (width: number, height: number) => StyleSheet.create({
    container: {
        height: height,
        width: width,
        alignItems: 'center',
    },
    splitContainer: {
        height: '88%',
        width: '100%',
        backgroundColor: "#505050",
    },
    split: {
        flexDirection: 'row',
        width: width,
        height: height * 0.18,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});