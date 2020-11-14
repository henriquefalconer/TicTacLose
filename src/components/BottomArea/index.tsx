import React from 'react';
import { useGame } from '../../hooks/useGame';

import { Container, RestartButton, RestartText } from './styles';

const BottomArea: React.FC = () => {

    const { whoWon, restart } = useGame();

    return (
        <Container>
            <RestartButton
                disabled={!whoWon}
                onPress={restart}
            >
                <RestartText>Restart</RestartText>
            </RestartButton>
        </Container>
    );
}

export default BottomArea;