import styled from 'styled-components';

const Delete = styled.div `
    display: inline-block;
    min-width: 20px;
    min-height: 20px;
    background-image: url(assets/images/png/delete.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20px;
    cursor: pointer;
`

export const DeleteItem = ({ onDelete }) => {
    return <Delete onClick={onDelete}></Delete>
}