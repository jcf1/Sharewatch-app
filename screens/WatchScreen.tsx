import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import * as io from 'socket.io-client';
import moment from 'moment';

import { WatchHeader } from './watch-components/WatchHeader';
import { StopWatch } from './watch-components/StopWatch';

interface Props {
    endWatch: () => void;
    isOffline: boolean;
    leftMode: boolean;
    isCreate: boolean;
    joinCode: string;
};

let socket: io.Socket;
const ENDPOINT = Platform.OS === 'ios' ? 'http://localhost:5000' : 'http://10.0.2.2:5000';

export const WatchScreen: React.FC<Props> = ({ endWatch, isOffline, leftMode, isCreate, joinCode }) => {
    const [socketId, setSocketId] = useState('');
    const [roomCode, setRoomCode] = useState('');
    const [currHead, setCurrHead] = useState('');
    const [romUsers, setRomUsers] = useState<string[]>([]);
    const [remoteIsRunning, setRemoteIsRunning] = useState(false);
    const [remoteStartTime, setRemoteStartTime] = useState(-1);

    //componentDidMount
    useEffect(() => {
        if(isOffline) {
            return;
        }

        socket = io.io(ENDPOINT, { transports: ["websocket"], reconnection: true, reconnectionAttempts: 10 });

        socket.on('connect_error', function() {
            closeAlert('Server Problem','Could not connect to server.');
        });
        
        socket.on('roomData', ({ room, head, running, startTime, users }) => {
            setRoomCode(room);
            setCurrHead(head);
            setRomUsers(users);
            setRemoteStartTime(remoteStartTime => startTime);
            setRemoteIsRunning(remoteIsRunning => running);
        });

        socket.on('inactivity', ({}) => {
            closeAlert('Inactivity Closure','Room was closed due to inactivity.');
        });

        socket.on('socket_id', ({ id }) => {
            setSocketId(id);
        });

        socket.emit('get_id', {}, ()=> {});
        if(isCreate) {
            socket.emit('create', {  }, () => { closeAlert("No Rooms Available", "No room codes are available at the moment.") });
        } else {
            setRoomCode(joinCode);
            socket.emit('join', { room: joinCode }, () => { closeAlert("Room Not Found", "No room currently available with that code.") });
        }
    }, []);

    function remoteStart() {
        //console.log(socketId);
        let s = moment().valueOf();
        socket.emit('start', {room: roomCode, startTime: s}, () => { closeAlert("Room Closed", "Your room is no longer available.") });
    }

    function remoteReset() {
        socket.emit('reset', {room: roomCode}, () => { closeAlert("Room Closed", "Your room is no longer available.") });
    }

    function closeAlert(title: string, message: string) {
        exit();
        Alert.alert(
            title,
            message,
            [
                {
                text: "OK",
                onPress: () => {},
                style: "cancel"
                }
            ]
        );
    }

    function exit() {
        if(!isOffline) {
            socket.disconnect();
            socket.off();
        }
        endWatch();
    }

    return(
        <View style={styles.body}>
            <WatchHeader isOffline={isOffline} endWatch={exit} code={roomCode} users={romUsers} />
            {isOffline ?
                <StopWatch isOffline={true} leftMode={leftMode} /> 
                :
                <StopWatch isOffline={false} leftMode={leftMode} isHead={socketId === currHead} isRunning={remoteIsRunning} startTime={remoteStartTime} remoteStart={remoteStart} remoteReset={remoteReset} exit={closeAlert} />
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