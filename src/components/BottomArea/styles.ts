import { TouchableOpacityProps } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
    justify-content: center;
    align-items: center;
    flex: 2;
`;

export const RestartButton = styled.TouchableOpacity<TouchableOpacityProps>`
    width: 60%;
    height: 50px;
    opacity: ${props => props.disabled ? .5 : 1};
    background-color: white;
    border-radius: 25px;
    justify-content: center;
`;

export const RestartText = styled.Text`
    text-align: center;
    color: black;
    font-size: 20px;
`;
