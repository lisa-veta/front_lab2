import styled from 'styled-components';

const Root = styled.div `
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
`

export const TodoItemContainer = ({children}) => {
  return <Root>{children}</Root>
}