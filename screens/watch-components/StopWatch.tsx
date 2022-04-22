import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, Alert } from 'react-native';
import { RFPercentage } from "react-native-responsive-fontsize";
import moment from 'moment';

import { TextFixedWidth } from './TextFixedWidth';
import { Splits } from './Splits';

interface Props {
    isOffline: boolean;
    leftMode: boolean;
    isHead?: boolean;
    isRunning?: boolean;
    startTime?: number;
    remoteStart?: () => void;
    remoteReset?: () => void;
    exit?: (title: string, message: string) => void;
};

export const StopWatch: React.FC<Props> = ({ isOffline, leftMode, isHead, isRunning, startTime, remoteStart, remoteReset, exit }) => {

    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const styles = createStyles(width, height);

    const [isLocalRunning, setLocalRunning] = useState(false);
    const [localStartTime, setLocalStartTime] = useState(0);
    const [localLapTime, setLocalLapTime] = useState(0);
    
    const [watchDisplayTime, setWatchDisplayTime] = useState(0);
    const [lapDisplayTime, setLapDisplayTime] = useState(0);

    const [watchTime, setWatchTime] = useState(0);
    const [lapTime, setLapTime] = useState(0);

    const [laps, setLaps] = useState<number[]>([]);
    const [splits, setSplits] = useState<number[]>([]);

    let watchInterval: { current: NodeJS.Timeout | null } = useRef(null);
    let splitInterval: { current: NodeJS.Timeout | null } = useRef(null);

    const inactivityLimit = 86400000;
    let inactiveTimeout: { current: NodeJS.Timeout | null } = useRef(null);

    useEffect(() => {
        if(!isOffline && exit) {
            inactiveTimeout.current = setTimeout(() => {
                exit('Inactivity Removal','You were removed from the room for inactivity.');
            }, inactivityLimit);
        }
        return () => {
            clearTimeout(inactiveTimeout.current as NodeJS.Timeout);
            stopWatch();
            resetWatch();
        }
      },[])

    function runWatch(accumTime: number, time: number) {
        setWatchDisplayTime(accumTime + (moment.now() - time));
    }

    function runLap(accumTime: number, time: number) {
        setLapDisplayTime(accumTime + (moment.now() - time));
    }

    function resetInactive() {
        if(!isOffline && exit) {
            clearTimeout(inactiveTimeout.current as NodeJS.Timeout);
            inactiveTimeout.current = setTimeout(() => {
                exit('Inactivity Removal','You were removed from the room for inactivity.');
            }, inactivityLimit);
        }
    }

    //---------OFFLINE STOPWATCH FUNCTIONS---------
    function stopIntervals() {
        clearInterval(watchInterval.current as NodeJS.Timeout);
        clearInterval(splitInterval.current as NodeJS.Timeout);
    }

    function localStartWatch() {
        const now: number = moment.now();
        setLocalRunning(true);
        setLocalStartTime(now);
        setLocalLapTime(now);

        watchInterval.current = setInterval(() => {
            runWatch(watchTime, now);
        }, 1);

        splitInterval.current = setInterval(() => {
            runLap(lapTime, now);
        }, 1);

        resetInactive();
    }

    function stopWatch() {
        const now: number = moment.now();
        setLocalRunning(false);
        setWatchTime(watchTime + now - localStartTime);
        setLapTime(lapTime + now - localLapTime);
        setWatchDisplayTime(watchTime + now - localStartTime);
        setLapDisplayTime(lapTime + now - localLapTime);
        stopIntervals();
        resetInactive();
    }

    function resetWatch() {
        setWatchTime(0);
        setLapTime(0);
        setWatchDisplayTime(0);
        setLapDisplayTime(0);
        setLaps([]);
        setSplits([]);
        resetInactive();
    }

    function splitWatch() {
        const now: number = moment.now();
        clearInterval(splitInterval.current as NodeJS.Timeout);
        setLaps([(now - localLapTime + lapTime), ...laps]);
        setSplits([(now - localStartTime + watchTime), ...splits]);
        setLocalLapTime(now);
        setLapTime(0);
        setLapDisplayTime(0);
        splitInterval.current = setInterval(() => {
            runLap(0, now);
        }, 1);
        resetInactive();
    }

    //---------REMOTE STOPWATCH FUNCTIONS---------

    function remoteClick() {
        resetInactive();
        if(!isRunning && remoteStart) {
            remoteStart();
        } else {
            resetAlert();
        }
    }

    useEffect(() => {
        if(isRunning) {
            if(!isLocalRunning && startTime && startTime > 0) {
                setLocalRunning(true);
                setLocalStartTime(startTime);
                setLocalLapTime(startTime);
                watchInterval.current = setInterval(() => {
                    runWatch(watchTime, startTime);
                }, 1);
                splitInterval.current = setInterval(() => {
                    runLap(lapTime, startTime);
                }, 1);
            }
        } else if(!isRunning) {
            if(isLocalRunning) {
                setLocalRunning(false);
                stopIntervals();
            }
            resetWatch();
        }
    }, [isRunning,startTime]);

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

    function timeToDisplay(millisec: number) {
        let display: string = (millisec % 1000).toString().padStart(3,"0");

        let sec_num: number = Math.floor(millisec / 1000);
        let minu_num: number = Math.floor(sec_num / 60);
        let hour_num: number = Math.floor(minu_num / 60);

        let sec: string = (sec_num % 60).toString();
        let hour: string = hour_num.toString();
        let minu: string = (minu_num % 60).toString();
        if(hour_num > 0) {
            minu = minu.padStart(2,"0");
            sec = sec.padStart(2,"0");
            display = hour_num < 999 ? hour+":"+minu+":"+sec+"."+display : hour+":"+minu+":"+sec;
        } else if(minu_num > 0) {
            sec = sec.padStart(2,"0");
            display = minu+":"+sec+"."+display;
        } else {
            display = sec+"."+display;
        }
        return display;
    }

    const startButton = <TouchableOpacity style={[styles.primaryButton, (!isOffline && !isRunning) ? styles.diabledButton : {}, isLocalRunning ? {backgroundColor: '#FE2E2E'} : {backgroundColor: '#2EFE2E'}]} onPress={!isLocalRunning ? localStartWatch : stopWatch} disabled={!isOffline && !isRunning}><Text style={styles.primaryButtonText}>{!isLocalRunning ? "START" : "STOP"}</Text></TouchableOpacity>
    const resetButton = <TouchableOpacity style={[styles.primaryButton, (!isOffline && !isRunning) ? styles.diabledButton : {}, {backgroundColor: '#E6E6E6'}]} onPress={!isLocalRunning ? resetWatch : splitWatch} disabled={!isOffline && !isRunning}><Text style={styles.primaryButtonText}>{!isLocalRunning ? "RESET" : "SPLIT"}</Text></TouchableOpacity>

    return(
        <View style={styles.container}>
           <View style={styles.watch}>
               <TextFixedWidth fontSize={6.25} color={'#ffffff'}>{timeToDisplay(watchDisplayTime)}</TextFixedWidth>
           </View>
           <View style={styles.lap}>
               <TextFixedWidth fontSize={4.25} color={'#ffff00'}>{timeToDisplay(lapDisplayTime)}</TextFixedWidth>
           </View>

            <View style={styles.primaryButtons}>
                <View style={{paddingRight: '10%'}}>
                    {leftMode ? startButton : resetButton}
                </View>
                <View style={{paddingLeft: '10%'}}>
                    {leftMode ? resetButton : startButton}
                </View>
            </View>

            <Splits laps={laps} splits={splits} timeToDisplay={timeToDisplay}/>

            {(!isOffline && isHead) && <View style={styles.remoteContainer}><TouchableOpacity style={styles.remoteButton} onPress={remoteClick}><Text style={styles.primaryButtonText}>{!isRunning ? "START ALL WATCHES" : "RESET ALL WATCHES"}</Text></TouchableOpacity></View>}
       </View>
    );
}

const createStyles = (width: number,height: number) => StyleSheet.create({
    container: {
        height: '93%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#2B2B2B',
    },
    watch: {
        height: '10%',
        paddingTop: '2%',
        paddingBottom: '2%',
    },
    lap: {
        height: '7%',
        paddingBottom: '2%',
    },
    primaryButtons: {
        height: '20%',
        alignItems: 'flex-start',
        flexDirection: 'row',
        paddingBottom: '5%',
    },
    primaryButton: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    diabledButton: {
        opacity: 0.5,
    },
    primaryButtonText: {
        color: '#000000',
        fontSize: RFPercentage(3.5),
    },
    remoteContainer: {
        height: '22%',
        width: '100%',
        paddingTop: '2%',
        paddingBottom: '2%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    remoteButton: {
        width: '80%',
        height: '80%',
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D99926',
    },
});