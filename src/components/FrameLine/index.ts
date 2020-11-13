import styled, { css } from 'styled-components/native';

interface FrameLineProps {
    horizontal?: boolean
}

export const FrameLine = styled.View<FrameLineProps>`
    background-color: white;
    align-self: stretch;
    ${
        props => props.horizontal 
            ? css` height: 2px; ` 
            : css` width: 2px; `
    }
`;
