import React, {useState, useRef, useEffect} from 'react';
import styled, { css } from "styled-components"
import {TodoItemContainer} from './TodoItemContainer'
import {TodoItemCheckbox} from './TodoItemCheckbox';
import {DeleteItem} from "./DeleteItem";
import {useDeleteTodoItem, useUpdateTodoItemChecked, useUpdateTodoItemPriority} from '../../data/hooks/useData';
import {Priorities} from "./Priority";

const checkedCss = css`
  color: var(--colorFrenchGray);
  text-decoration: line-through;
`

const Title = styled.span(props => {
  return `
    font-size: 15px;
    word-break: break-word; 
    ${props.checked ? checkedCss : ''};
  `;
})


export const TodoItem = ({itemId, title, checked, itemPriority}) => {
  const { mutate: deleteMutate } = useDeleteTodoItem();
  const { mutate: updateCheckedMutate } = useUpdateTodoItemChecked();
  const { mutate: updatePriorityMutate } = useUpdateTodoItemPriority();
  const [priority, setCurrentPriority] = useState(itemPriority);

  const handleDelete = () => {
      const confirm = window.confirm("Вы уверены, что хотите безвозвратно удалить элемент?")
      if(confirm) {
          deleteMutate(itemId);
      }
  };

  const handleCheckboxChange = () => {
      updateCheckedMutate({ id: itemId, checked: !checked });
  };

  const handlePriorityChange = (newPriority) => {
      setCurrentPriority(newPriority);
      updatePriorityMutate({ id: itemId, priority: newPriority });
  };

  return (
    <TodoItemContainer>
        <TodoItemContainer>
            <TodoItemCheckbox checked={checked} onChange={handleCheckboxChange}/>
            <Title checked={checked}>
                {title}
            </Title>
        </TodoItemContainer>
      <TodoItemContainer>
          <Priorities priority={priority} setPriority={handlePriorityChange} />
          <DeleteItem onDelete={handleDelete}/>
      </TodoItemContainer>
    </TodoItemContainer>
  )
}
