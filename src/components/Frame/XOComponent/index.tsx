import React from 'react';

import { useGame } from '../../../hooks/useGame';

import { PositionId, SymbolData } from '../../../interfaces/GameData';

import XImage from '../../../assets/X.png';
import OImage from '../../../assets/O.png';

import { ButtonContainer, SymbolImage } from './styles';

interface XORowProps {
    positionId: PositionId;
}

const XOComponent: React.FC<XORowProps> = ({ positionId }) => {

    const { gameData, onPressXOComponent } = useGame();

    const [row, column] = positionId;

    const symbolData = gameData[row][column]

    return (
        <ButtonContainer
            onPress={() => onPressXOComponent(positionId)}
        >
            {
                symbolData !== SymbolData.None && (
                    <SymbolImage
                        source={
                            symbolData === SymbolData.X
                                ? XImage
                                : OImage
                        }
                    />
                )
            }
        </ButtonContainer>
    );
}

export default XOComponent;