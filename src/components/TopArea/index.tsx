import React from 'react';

import { Player } from '../../interfaces/GameData';

import { useGame } from '../../hooks/useGame';

import { Container, TurnText } from './styles';

const TopArea: React.FC = () => {

    const { currentPlayer, whoWon } = useGame();

    return (
        <Container>
            <TurnText>
                {
                    whoWon === Player.None
                        ? 'Very well, my friend.\nA draw.'
                        : whoWon === Player.Computer
                            ? 'I won.'
                            : whoWon === Player.Human
                                ? 'You won.'
                                : currentPlayer === Player.Human
                                    ? 'Your turn, human'
                                    : 'Now it\'s my turn'
                }
            </TurnText>
        </Container>
    );
}

export default TopArea;