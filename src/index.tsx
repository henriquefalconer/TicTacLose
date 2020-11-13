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

const App: React.FC = () => {
    return (
        <Background>
            <StatusBar barStyle='light-content' />
            
        </Background>
    );
};

export default App;
