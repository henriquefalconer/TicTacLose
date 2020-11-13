import React from 'react';

import { FrameLine } from '../FrameLine';

import { Container, X, O } from './styles';

const XORow: React.FC = () => {
    return (
        <Container>
            <X/>
            <FrameLine/>
            <X/>
            <FrameLine/>
            <O/>
        </Container>
    );
}

export default XORow;