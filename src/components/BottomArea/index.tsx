import React from 'react';
import { useGame } from '../../hooks/useGame';

import { Container, Space, Button, TextButton, Text } from './styles';

const BottomArea: React.FC = () => {

    const { whoWon, humanWins, restart, changeMode } = useGame();

    return (
        <Container>
            <Button
                disabled={!whoWon}
                onPress={restart}
            >
                <Text>Restart</Text>
            </Button>
            <Space />
            <TextButton
                disabled={!whoWon}
                onPress={changeMode}
            >
                <Text white={true}>{humanWins ? 'Change to TicTacLose' : 'Change to TicTacWin'}</Text>
            </TextButton>
        </Container>
    );
}

export default BottomArea;