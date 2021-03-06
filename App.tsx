import React, {FC, useState} from 'react';
import { SafeAreaView, StatusBar } from 'react-native';

import { StartScreen } from './screens/StartScreen';
import { WatchScreen } from './screens/WatchScreen';

const App: FC = () => {
  const [isWatch,setWatch] = useState(false);
  const [isOffline, setOffline] = useState(false);
  const [isCreate, setCreate] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [leftMode, setLeftMode] = useState(false);

  function beginWatch() {
    setWatch(true);
  }

  function endWatch() {
    setWatch(false);
  }

  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView>
        {!isWatch ? <StartScreen beginWatch={beginWatch} setOffline={setOffline} setCreate={setCreate} setRoomCode={setRoomCode} leftMode={leftMode} setLeftMode={setLeftMode} /> : <WatchScreen endWatch={endWatch} isOffline={isOffline} leftMode={leftMode} isCreate={isCreate} joinCode={roomCode} />}
      </SafeAreaView>
    </>
  );
}

export default App;