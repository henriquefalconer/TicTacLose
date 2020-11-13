import React from 'react';

import { SymbolData } from '../../interfaces/GameData';

import { FrameLine } from '../FrameLine';

import { Container, SymbolText } from './styles';

interface XORowProps {
    data: Array<SymbolData>;
}

const XORow: React.FC<XORowProps> = ({ data }) => {
    return (
        <Container>
            <SymbolText>{ data[0] }</SymbolText>
            <FrameLine/>
            <SymbolText>{ data[1] }</SymbolText>
            <FrameLine/>
            <SymbolText>{ data[2] }</SymbolText>
        </Container>
    );
}

export default XORow;