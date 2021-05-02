import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 2;
`;

export const Space = styled.View`
    height: 19px;
`

export const Button = styled.TouchableOpacity<TouchableOpacityProps>`
    width: 60%;
    height: 50px;
    opacity: ${props => props.disabled ? .5 : 1};
    background-color: white;
    border-radius: 25px;
    justify-content: center;
`;

export const TextButton = styled.TouchableOpacity<TouchableOpacityProps>`
    height: 50px;
    opacity: ${props => props.disabled ? .5 : 1};
`;

interface TextProps {
    white?: boolean;
}

export const Text = styled.Text<TextProps>`
    text-align: center;
    color: ${props => props.white ? 'white' : 'black'};
    font-weight: ${props => props.white ? '500' : 'normal'};
    font-size: 20px;
`;
