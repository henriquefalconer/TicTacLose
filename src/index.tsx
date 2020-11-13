import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import Background from './components/Background';
import Frame from './components/Frame';

const App: React.FC = () => {
    return (
        <Background>
            <StatusBar barStyle='light-content' />
            <Frame />
        </Background>
    );
};

export default App;