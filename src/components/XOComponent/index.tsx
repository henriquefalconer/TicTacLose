import React from 'react';

import { SymbolData } from '../../interfaces/GameData';

import XImage from '../../assets/X.png';
import OImage from '../../assets/O.png';

import { Container, SymbolImage } from './styles';

interface XORowProps {
    data: SymbolData;
}

const XOComponent: React.FC<XORowProps> = ({ data }) => {
    return (
        <Container>
            {
                data !== SymbolData.None && <SymbolImage
                    source={
                        data === SymbolData.X
                            ? XImage
                            : OImage
                    }
                />
            }
        </Container>
    );
}

export default XOComponent;