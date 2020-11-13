import React from 'react';

import { FrameLine } from '../FrameLine';
import XORow from '../XORow';

import { Container } from './styles';

const Frame: React.FC = () => {
    return (
        <Container>
            <XORow row={0} />
            <FrameLine horizontal />
            <XORow row={1} />
            <FrameLine horizontal />
            <XORow row={2} />
        </Container>
    );
}

export default Frame;