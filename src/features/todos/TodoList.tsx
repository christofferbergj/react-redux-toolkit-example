import React, { ChangeEvent, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Todos slice
import {
  addTodo,
  selectActiveTodosCount,
  selectCompleteTodosCount,
  selectTodosCount,
} from './todosSlice'

// Filters slice
import { selectVisibleTodos, VisibilityFilters } from 'features/visibilityFilter/filtersSlice'

// Components
import { TodoItem } from './TodoItem'
import { FilterButton } from 'features/visibilityFilter'
import {
  Button,
  Divider,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  List,
  Stack,
} from '@chakra-ui/core/dist'

export const TodoList = () => {
  const dispatch = useDispatch()
  const [todoDescription, setTodoDescription] = useState<string>('')

  // State selectors
  const todos = useSelector(selectVisibleTodos)
  const todosCount = useSelector(selectTodosCount)
  const completeTodosCount = useSelector(selectCompleteTodosCount)
  const activeTodosCount = useSelector(selectActiveTodosCount)

  const inputRef = useRef<HTMLDivElement | any>()

  const handleAddTodo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!todoDescription) return

    dispatch(addTodo(todoDescription))
    setTodoDescription('')
  }

  return (
    <>
      <FormControl as="form" onSubmit={handleAddTodo}>
        <InputGroup size={'lg'} mt={5}>
          <Input
            ref={inputRef}
            onChange={({ currentTarget }: ChangeEvent<HTMLInputElement>) =>
              setTodoDescription(currentTarget.value)
            }
            _focus={{ shadow: 'outline', borderColor: 'transparent' }}
            focusBorderColor={'none'}
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

      {todos.length > 0 && (
        <List
          as={'ul'}
          display={'flex'}
          flexDirection={'column'}
          alignItems={'start'}
          spacing={2}
          mt={8}
        >
          {todos.map(({ id, description, isCompleted }) => (
            <TodoItem key={id} id={id} description={description} isCompleted={isCompleted} />
          ))}
        </List>
      )}

      <Divider mt={5} mb={3} />

      <Stack isInline spacing={2} justify={'flex-end'}>
        <FilterButton filter={VisibilityFilters.SHOW_ALL} count={todosCount}>
          All
        </FilterButton>

        <FilterButton filter={VisibilityFilters.SHOW_ACTIVE} count={activeTodosCount}>
          Active
        </FilterButton>

        <FilterButton
          filter={VisibilityFilters.SHOW_COMPLETED}
          count={completeTodosCount}
          isDisabled={!completeTodosCount}
        >
          Completed
        </FilterButton>
      </Stack>
    </>
  )
}
