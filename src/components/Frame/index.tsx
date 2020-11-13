import React from 'react';

import { useGame } from '../../hooks/useGame';

import { FrameLine } from '../FrameLine';
import XORow from '../XORow';

import { Container } from './styles';

const Frame: React.FC = () => {

    const { gameData } = useGame();

    return (
        <Container>
            <XORow data={gameData[0]} />
            <FrameLine horizontal />
            <XORow data={gameData[1]} />
            <FrameLine horizontal />
            <XORow data={gameData[2]} />
        </Container>
    );
}

export default Frame;