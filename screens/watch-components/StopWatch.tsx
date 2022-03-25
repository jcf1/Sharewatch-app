import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import moment from 'moment';

import { TextFixedWidth } from './TextFixedWidth';
import { Splits } from './Splits';

interface Props {
    isOffline: boolean;
    isHead?: boolean;
    isRunning?: boolean;
    startTime?: number;
    remoteStart?: () => void;
    remoteReset?: () => void;
};

export const StopWatch: React.FC<Props> = ({ isOffline, isHead, isRunning, startTime, remoteStart, remoteReset }) => {

    const [isLocalRunning, setLocalRunning] = useState(false);
    const [localStartTime, setLocalStartTime] = useState(0);
    const [localSplitTime, setLocalSplitTime] = useState(0);
    
    const [watchDisplayTime, setWatchDisplayTime] = useState(0);
    const [splitDisplayTime, setSplitDisplayTime] = useState(0);

    const [watchTime, setWatchTime] = useState(0);
    const [splitTime, setSplitTime] = useState(0);

    const [splits, setSplits] = useState<number[]>([]);

    let watchInterval: { current: NodeJS.Timeout | null } = useRef(null);
    let splitInterval: { current: NodeJS.Timeout | null } = useRef(null);

    function resetAlert() {
        Alert.alert(
            "Room Reset",
            "Are you sure you want to stop and reset all connected watches?",
            [
                {
                text: "No",
                onPress: () => {},
                style: "cancel"
                },
                { text: "Yes", onPress: remoteReset }
            ]
        );
    }

    useEffect(() => {
        if(isRunning && startTime && startTime > 0) {
            setLocalRunning(true);
            setLocalStartTime(startTime);
            setLocalSplitTime(startTime);
            startIntervals(startTime);
        } else if(!isRunning) {
            if(isLocalRunning) {
                stopWatch();
            }
            resetWatch();
        }
    }, [isRunning, startTime]);

    function runWatch(time: number) {
        setWatchDisplayTime(watchTime + (moment.now() - time));
    }

    function runSplit(time: number) {
        setSplitDisplayTime(splitTime + (moment.now() - time));
    }

    //---------OFFLINE STOPWATCH FUNCTIONS---------

    function startIntervals(time: number) {
        watchInterval.current = setInterval(() => {
            runWatch(time);
        }, 1);
        splitInterval.current = setInterval(() => {
            runSplit(time);
        }, 1);
    }

    function localStartWatch() {
        const now: number = moment.now();
        setLocalRunning(true);
        setLocalStartTime(now);
        setLocalSplitTime(now);
        startIntervals(now);
    }

    function stopWatch() {
        const now: number = moment.now();
        setLocalRunning(false);
        setWatchTime(watchTime + now - localStartTime);
        setSplitTime(splitTime + now - localSplitTime);
        setWatchDisplayTime(watchTime + now - localStartTime);
        setSplitDisplayTime(splitTime + now - localSplitTime);
        clearInterval(watchInterval.current as NodeJS.Timeout);
        clearInterval(splitInterval.current as NodeJS.Timeout);
    }

    function resetWatch() {
        setWatchTime(0);
        setSplitTime(0);
        setWatchDisplayTime(0);
        setSplitDisplayTime(0);
        setSplits([]);
    }

    function splitWatch() {
        const now: number = moment.now();
        clearInterval(splitInterval.current as NodeJS.Timeout);
        setSplits(splits.concat(now - localSplitTime));
        setLocalSplitTime(now);
        setSplitTime(0);
        setSplitDisplayTime(0);
        splitInterval.current = setInterval(() => {
            runSplit(now);
        }, 1);
    }

    //---------REMOTE STOPWATCH FUNCTIONS---------

    function timeToDisplay(millisec: number) {
        let display: string = (millisec % 1000).toString().padStart(3,"0");

        let sec_num: number = Math.floor(millisec / 1000);
        let minu_num: number = Math.floor(sec_num / 60);
        let hour_num: number = Math.floor(minu_num / 60);

        let sec: string = (sec_num % 60).toString();
        let hour: string = (hour_num % 100).toString();
        let minu: string = (minu_num % 60).toString();
        if(hour_num > 0) {
            minu = minu.padStart(2,"0");
            sec = sec.padStart(2,"0");
            display = hour+":"+minu+":"+sec+"."+display;
        } else if(minu_num > 0) {
            sec = sec.padStart(2,"0");
            display = minu+":"+sec+"."+display;
        } else {
            display = sec+"."+display;
        }
        
        return display;
    }

    return(
        <View style={styles.container}>
           <View style={styles.watch}>
               <TextFixedWidth fontSize={50} color={'#ffffff'}>{timeToDisplay(watchDisplayTime)}</TextFixedWidth>
           </View>
           <View style={styles.split}>
               <TextFixedWidth fontSize={35} color={'#ffff00'}>{timeToDisplay(splitDisplayTime)}</TextFixedWidth>
           </View>

            <View style={styles.primaryButtons}>
                <View style={{paddingRight: 20}}>
                    <TouchableOpacity style={[styles.primaryButton]} onPress={!isLocalRunning ? localStartWatch : stopWatch} disabled={!isOffline && !isRunning}>
                        <Text style={styles.primaryButtonText}>{!isLocalRunning ? "START" : "STOP"}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{paddingLeft: 20}}>
                    <TouchableOpacity style={[styles.primaryButton]} onPress={!isLocalRunning ? resetWatch : splitWatch} disabled={!isOffline && !isRunning}>
                        <Text style={styles.primaryButtonText}>{!isLocalRunning ? "RESET" : "SPLIT"}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Splits splits={splits} timeToDisplay={timeToDisplay}/>

            {(!isOffline && isHead) ? <View style={{paddingTop: 50}}><TouchableOpacity style={styles.remoteButton} onPress={!isRunning ? remoteStart : resetAlert}><Text style={styles.primaryButtonText}>{!isRunning ? "START ALL WATCHES" : "RESET ALL WATCHES"}</Text></TouchableOpacity></View> : null}
       </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#2B2B2B',
    },
    watch: {
        paddingTop: 40,
        paddingBottom: 20,
    },
    split: {
        paddingBottom: 20,
    },
    primaryButtons: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: 30,
    },
    primaryButton: {
        width: 125,
        height: 125,
        borderRadius: 250,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    primaryButtonText: {
        color: '#000000',
        fontSize: 30,
    },
    remoteButton: {
        width: 325,
        height: 100,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
});