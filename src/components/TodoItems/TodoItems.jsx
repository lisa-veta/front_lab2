import React, {useState} from 'react';
import {TodoItemsContainer} from './TodoItemsContainer';
import {NewTodoItem} from '../TodoItem/NewTodoItem';
import {TodoItem} from '../TodoItem/TodoItem';
import {useData} from '../../data/hooks/useData';
import {SearchInput} from './components/SearchInput';
import {PriorityFilter} from "../TodoItem/Priority";
import {priorityOrder} from "../../utils/PriorityOrder";

export const TodoItems = () => {
  const [searchValue, setSearchValue] = useState('');
  const [filterPriority, setFilterPriority] = useState(null);

  const {data: todoItems, isLoading} = useData();

  if (!todoItems || isLoading) {
    return (
      <TodoItemsContainer>
        Загрузка данных...
      </TodoItemsContainer>
    );
  }
  const normalizeString = (str) => str.replace(/\s+/g, '').toLowerCase();
  // Фукнция filter вызывает для каждого элемента переданный ей колбек
  // И формирует в filteredBySearchItems новый массив элементов, для которых колбек вернул true
  // Для проверки вхождения подстроки в строку нужно использовать indexOf
  const filteredBySearchItems = todoItems.filter((todoItem) => {
    const clearedTodoItemTitle = normalizeString(todoItem.title);
    const clearedSearchValue = normalizeString(searchValue);
    const isSearched = clearedTodoItemTitle.includes(clearedSearchValue);
    return searchValue.length >= 3 ? isSearched : true;
  });


  const sortedByPriorityItems = filterPriority
    ? priorityOrder[filterPriority].flatMap((priority) =>
        filteredBySearchItems.filter(item => item.priority === priority)
    )
    : filteredBySearchItems;

  const todoItemsElements = sortedByPriorityItems.map((item, index) => {
    return <TodoItem key={item.id} itemId={item.id} title={item.title} checked={item.isDone} itemPriority={item.priority} />;
  });

  return (
    <TodoItemsContainer>
      <PriorityFilter setFilterPriority={setFilterPriority} />
      <SearchInput value={searchValue} setValue={setSearchValue} />
      {todoItemsElements}
      <NewTodoItem />
    </TodoItemsContainer>
  )
}