import React from 'react';
import { View } from 'react-native';

import { useGame } from '../../../hooks/useGame';

import { FrameLine } from '../FrameLine';
import XORow from '../XORow';

import { Container } from './styles';

const FrameComponent: React.FC = () => {

    const { gameData } = useGame();

    return (
        <Container>
            {
                Array(gameData.dimensions).join().split(',').map(
                    (_, index) => (
                        <View
                            key={index}
                            style={{ flex: 1 }}
                        >
                            { index !== 0 && <FrameLine horizontal /> }
                            <XORow row={index} />
                        </View>
                    )
                )
            }
        </Container>
    );
}

export default FrameComponent;