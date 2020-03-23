import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Todos slice
import { selectTodos, create } from './todosSlice'

// Components
import { TodoItem } from './TodoItem'
import {
  Button,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  List,
} from '@chakra-ui/core/dist'

export const TodoList = () => {
  const dispatch = useDispatch()
  const [todoDescription, setTodoDescription] = useState<string>('')

  /**
   * Todos selected from state
   * @type {Todo[]}
   */
  const todos = useSelector(selectTodos)

  const handleAddTodo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!todoDescription) return

    dispatch(create(todoDescription))
    setTodoDescription('')
  }

  return (
    <>
      {todos.length > 0 && (
        <List as={'ul'} display={'flex'} flexDirection={'column'} alignItems={'start'} spacing={2}>
          {todos.map(({ id, description, isCompleted }) => (
            <TodoItem key={id} id={id} description={description} isCompleted={isCompleted} />
          ))}
        </List>
      )}

      <FormControl as="form" onSubmit={handleAddTodo}>
        <InputGroup size={'lg'} mt={8}>
          <Input
            focusBorderColor={'purple.500'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTodoDescription(e.target.value)}
            placeholder="What needs to be done?"
            pr="4.5rem"
            type="text"
            value={todoDescription}
          />

          <InputRightElement width="4.5rem">
            <Button
              h="2rem"
              isDisabled={!todoDescription}
              onClick={() => handleAddTodo}
              type={'submit'}
            >
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  )
}
