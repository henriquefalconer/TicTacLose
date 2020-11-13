import styled from 'styled-components/native';

export const Container = styled.View`
    justify-content: space-between;
    align-items: center;
    flex: 1;
    flex-direction: row;
`;

export const X = styled.Text.attrs({
    children: 'X'
})`
    color: white;
    font-size: 100px;
    flex: 1;
    text-align: center;
`;

export const O = styled.Text.attrs({
    children: 'O'
})`
    color: white;
    font-size: 100px;
    flex: 1;
    text-align: center;
`;