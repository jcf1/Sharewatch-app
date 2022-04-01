import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';

import { TextFixedWidth } from './TextFixedWidth';
import { DotIndictor } from './DotIndicator';

interface Props {
    laps: number[];
    splits: number[];
    timeToDisplay: (millisec: number) => string;
};

export const Splits: React.FC<Props> = ({ laps, splits, timeToDisplay }) => {

    const scrollRef = useRef<ScrollView>(null);
    const lapsRef = useRef<FlatList<number>>(null);
    const splitsRef = useRef<FlatList<number>>(null);

    const [scrollIndex,setScrollIndex] = useState(0);

    useEffect(() => {
        if(laps.length > 0) {
            lapsRef?.current?.scrollToIndex({ index: 0 });
            splitsRef?.current?.scrollToIndex({ index: 0 });
        }
    }, [laps,splits]);
    
    function renderLap(lap: number, index: number) {
        let color: string = ((index % 2) === 0) ? "#2E2E2E" : "#6E6E6E";
        return(
            <View style={[styles.split, {backgroundColor: color}]}>
                <View style={{paddingLeft: 5}}>
                    <TextFixedWidth fontSize={25} color={"#FFFFFF"}>{"LAP "+(index+1).toString()}</TextFixedWidth>
                </View>
                <View style={{paddingRight: 5}}>
                <TextFixedWidth fontSize={25} color={"#FFFFFF"}>{timeToDisplay(lap)}</TextFixedWidth>
                </View>
            </View>
        );
    }

    function renderSplit(split: number, index: number) {
        let color: string = ((index % 2) === 0) ? "#2E2E2E" : "#6E6E6E";
        return(
            <View style={[styles.split, {backgroundColor: color}]}>
                <View style={{paddingLeft: 5}}>
                    <TextFixedWidth fontSize={25} color={"#FFFFFF"}>{"SPLIT "+(index+1).toString()}</TextFixedWidth>
                </View>
                <View style={{paddingRight: 5}}>
                <TextFixedWidth fontSize={25} color={"#FFFFFF"}>{timeToDisplay(split)}</TextFixedWidth>
                </View>
            </View>
        );
    }

    return(
        <View>
            <ScrollView 
                ref={scrollRef}
                style={styles.splitView}
                horizontal={true}
                decelerationRate={0}
                snapToInterval={325}
                removeClippedSubviews={true}
                pagingEnabled={true}
                onScroll={(e) => setScrollIndex(Math.floor(e.nativeEvent.contentOffset.x / 325))}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.splitView}>
                    <FlatList
                        ref={lapsRef}
                        data={laps}
                        renderItem={({ item, index }) => renderLap(item, laps.length - 1 - index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={styles.splitView}>
                    <FlatList
                        ref={splitsRef}
                        data={splits}
                        renderItem={({ item, index }) => renderSplit(item, splits.length - 1 - index)}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </ScrollView>
            <DotIndictor index={scrollIndex} total={2}/>
        </View>
    );
}

const styles = StyleSheet.create({
    splitView: {
        height: 180,
        maxHeight: 180,
        width: 325,
        backgroundColor: "#505050",
    },
    split: {
        flexDirection: 'row',
        height: 28,
        marginBottom: 2,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});