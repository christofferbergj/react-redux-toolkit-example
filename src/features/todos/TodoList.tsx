import React, { FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Todos slice
import { selectTodos, toggle } from './todosSlice'

// Components
import { TodoItem } from './TodoItem'
import { Button, Input, InputGroup, InputRightElement, List } from '@chakra-ui/core/dist'

export const TodoList = () => {
  /**
   * Todos selected from state
   * @type {Todo[]}
   */
  const todos = useSelector(selectTodos)

  const handleAddTodo = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log('handleAddTodo')
  }

  return (
    <>
      <List
        as={'ol'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'start'}
        styleType="decimal"
        spacing={3}
      >
        {todos.map(({ id, desc, isCompleted }) => (
          <TodoItem key={id} id={id} desc={desc} isCompleted={isCompleted} />
        ))}
      </List>

      <InputGroup size="md" mt={8}>
        <Input pr="4.5rem" placeholder="Add new todo" />
        <InputRightElement width="4.5rem">
          <Button type={'submit'} h="1.75rem" size="sm" onClick={handleAddTodo}>
            Add
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  )
}
