import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import * as io from 'socket.io-client';
import moment from 'moment';

import { WatchHeader } from './watch-components/WatchHeader';
import { StopWatch } from './watch-components/StopWatch';

interface Props {
    endWatch: () => void;
    isOffline: boolean;
    isCreate: boolean;
    joinCode: string;
};

let socket: io.Socket;
const ENDPOINT = 'http://localhost:5000';

export const WatchScreen: React.FC<Props> = ({ endWatch, isOffline, isCreate, joinCode }) => {
    const [socketId, setSocketId] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [currHead, setCurrHead] = useState('');
    const [remoteIsRunning, setRemoteIsRunning] = useState(false);
    const [remoteStartTime, setRemoteStartTime] = useState(-1);

    //componentDidMount
    useEffect(() => {
        if(isOffline) {
            return;
        }

        socket = io.io(ENDPOINT, { transports: ["websocket"] });
        
        socket.on('roomData', ({ room, head, running, startTime, users }) => {
            setRoomCode(room);
            setCurrHead(head);
            setRemoteStartTime(remoteStartTime => startTime);
            setRemoteIsRunning(remoteIsRunning => running);
        });

        socket.on('socket_id', ({ id }) => {
            setSocketId(id);
        });

        socket.emit('get_id', {}, ()=> {});
        if(isCreate) {
            socket.emit('create', {  }, () => {});
        } else {
            setRoomCode(joinCode);
            socket.emit('join', { room: joinCode }, () => {});
        }
    }, []);

    function remoteStart() {
        //console.log(socketId);
        let s = moment().valueOf();
        socket.emit('start', {room: roomCode, startTime: s}, () => {});
    }

    function remoteReset() {
        socket.emit('reset', {room: roomCode}, () => {});
    }

    function close() {
        if(!isOffline) {
            socket.disconnect();
            socket.off();
        }
        endWatch();
    }

    return(
        <View style={styles.body}>
            <WatchHeader isOffline={isOffline} endWatch={close} code={roomCode} isHead={socketId === currHead} />
            {isOffline ?
                <StopWatch isOffline={true} /> 
                :
                <StopWatch isOffline={false} isHead={socketId === currHead} isRunning={remoteIsRunning} startTime={remoteStartTime} remoteStart={remoteStart} remoteReset={remoteReset} />
            }
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        height: '100%',
        backgroundColor: '#2B2B2B',
    },
})