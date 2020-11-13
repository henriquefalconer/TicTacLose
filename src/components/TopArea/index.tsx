import React from 'react';

import { Player } from '../../interfaces/GameData';

import { useGame } from '../../hooks/useGame';

import { Container, TurnText } from './styles';

const TopArea: React.FC = () => {

    const { currentPlayer } = useGame();

    return (
        <Container>
            <TurnText>
                {
                    currentPlayer === Player.Human
                        ? 'Your turn, human'
                        : 'Now it\'s my turn'
                }
            </TurnText>
        </Container>
    );
}

export default TopArea;