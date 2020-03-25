import React, { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Todos slice
import { addTodo, deleteCompleted, selectCompleteTodosCount } from './todosSlice'

// Filters slice
import { selectVisibleTodos, VisibilityFilters } from 'features/visibilityFilter/filtersSlice'

// Components
import { TodoItem } from './TodoItem'
import { FilterButton } from 'features/visibilityFilter'
import {
  Button,
  Divider,
  Flex,
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

  // State selector
  const todos = useSelector(selectVisibleTodos)
  const completeTodosCount = useSelector(selectCompleteTodosCount)

  const handleAddTodo = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (!todoDescription.trim()) return

    dispatch(addTodo(todoDescription))
    setTodoDescription('')
  }

  return (
    <>
      <FormControl as="form" onSubmit={handleAddTodo}>
        <InputGroup size={'lg'} mt={5}>
          <Input
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

      <Flex align={'center'} width={'full'}>
        {!!completeTodosCount && (
          <Button
            onClick={() => dispatch(deleteCompleted())}
            variant={'link'}
            size={'xs'}
            leftIcon={'delete'}
          >
            Clear completed
          </Button>
        )}

        <Stack isInline spacing={2} ml={'auto'}>
          <FilterButton filter={VisibilityFilters.SHOW_ALL}>All</FilterButton>
          <FilterButton filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterButton>
          <FilterButton filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterButton>
        </Stack>
      </Flex>
    </>
  )
}
