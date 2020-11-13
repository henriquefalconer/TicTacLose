import React from 'react';

import { FrameLine } from '../FrameLine';
import XORow from '../XORow';

import { Container } from './styles';

const Frame: React.FC = () => {
    return (
        <Container>
            <XORow />
            <FrameLine horizontal />
            <XORow />
            <FrameLine horizontal />
            <XORow />
        </Container>
    );
}

export default Frame;