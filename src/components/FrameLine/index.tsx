import styled, { css } from 'styled-components/native';

interface FrameLineProps {
    horizontal?: boolean
}

export const FrameLine = styled.View<FrameLineProps>`
    background-color: white;
    ${
        props => props.horizontal 
            ? css`
                height: 2px;
                align-self: stretch;
            ` 
            : css`
                width: 2px;
                align-self: stretch;
            ` 
    }
`;
