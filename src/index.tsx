import React from 'react';
import { StatusBar } from 'react-native';

import { GameProvider } from './hooks/useGame';

import Background from './components/Background';
import FrameComponent from './components/Frame/FrameComponent';

const App: React.FC = () => {
    return (
        <GameProvider>
            <Background>
                <StatusBar barStyle='light-content' />
                <FrameComponent />
            </Background>
        </GameProvider>
    );
};

export default App;
