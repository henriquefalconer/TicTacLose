import React from 'react';
import { View } from 'react-native';

import { useGame } from '../../../hooks/useGame';

import { FrameLine } from '../FrameLine';
import XOComponent from '../XOComponent';

import { Container } from './styles';

interface XORowProps {
    row: number;
}

const XORow: React.FC<XORowProps> = ({ row }) => {

    const { gameData } = useGame();

    return (
        <Container>
            {
                Array(gameData.dimensions).join().split(',').map(
                    (_, index) => (
                        [
                            ...[index !== 0 ? [<FrameLine key={index + 'line'} />] : []],
                            <XOComponent
                                key={index + 'XO'}
                                positionId={[row, index]}
                            />
                        ]
                    )
                )
            }
        </Container>
    );
}

export default XORow;