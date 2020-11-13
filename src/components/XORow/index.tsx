import React from 'react';

import { SymbolData } from '../../interfaces/GameData';

import { FrameLine } from '../FrameLine';
import XOComponent from '../XOComponent';

import { Container } from './styles';

interface XORowProps {
    row: number;
}

const XORow: React.FC<XORowProps> = ({ row }) => {
    return (
        <Container>
            <XOComponent 
                positionId={[row, 0]} 
            />
            <FrameLine/>
            <XOComponent 
                positionId={[row, 1]} 
            />
            <FrameLine/>
            <XOComponent 
                positionId={[row, 2]} 
            />
        </Container>
    );
}

export default XORow;