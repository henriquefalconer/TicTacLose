import React from 'react';

import { SymbolData } from '../../interfaces/GameData';

import { FrameLine } from '../FrameLine';
import XOComponent from '../XOComponent';

import { Container } from './styles';

interface XORowProps {
    data: Array<SymbolData>;
}

const XORow: React.FC<XORowProps> = ({ data }) => {
    return (
        <Container>
            <XOComponent data={data[0]} />
            <FrameLine/>
            <XOComponent data={data[1]} />
            <FrameLine/>
            <XOComponent data={data[2]} />
        </Container>
    );
}

export default XORow;