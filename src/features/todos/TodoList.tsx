import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Todos slice
import {
  addTodoFirebase,
  deleteCompleted,
  completeAll,
  selectActiveTodosCount,
  selectCompleteTodosCount,
  selectTodos,
} from './todosSlice'

// Filters slice
import {
  selectVisibleTodos,
  VisibilityFilters,
  setFilter,
  selectFilter,
} from 'features/visibilityFilter/filtersSlice'

// Components
import { TodoItem } from './TodoItem'
import { FilterButtons } from 'features/visibilityFilter'
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
  useToast,
} from '@chakra-ui/core/dist'

export const TodoList = () => {
  const toast = useToast()
  const dispatch = useDispatch()
  const [todoDescription, setTodoDescription] = useState<string>('')

  // State selector
  const todos = useSelector(selectVisibleTodos)
  const activeTodosCount = useSelector(selectActiveTodosCount)
  const completeTodosCount = useSelector(selectCompleteTodosCount)
  const visibilityFilter = useSelector(selectFilter)
  const { error } = useSelector(selectTodos)

  // Change filter depending on number of items in respective filter
  useEffect(() => {
    if (visibilityFilter === VisibilityFilters.SHOW_ACTIVE && !activeTodosCount) {
      dispatch(setFilter(VisibilityFilters.SHOW_COMPLETED))
    }

    if (visibilityFilter === VisibilityFilters.SHOW_COMPLETED && !completeTodosCount) {
      dispatch(setFilter(VisibilityFilters.SHOW_ALL))
    }
  }, [activeTodosCount, completeTodosCount, dispatch, visibilityFilter])

  useEffect(() => {
    error &&
      toast({
        title: 'Could not add todo',
        description: error.message,
        duration: 2000,
        status: 'error',
      })
  }, [error, toast])

  /**
   * Handles adding a todo
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleAddTodo = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (!todoDescription.trim()) return

    dispatch(addTodoFirebase(todoDescription))
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
              h="1.75rem"
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

      <Divider my={5} />

      <Flex width={'full'} direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }}>
        {(activeTodosCount > 0 || completeTodosCount > 0) && (
          <Stack isInline spacing={5} mb={{ base: 6, md: 0 }}>
            {activeTodosCount > 0 && (
              <Button
                onClick={() => dispatch(completeAll())}
                leftIcon={'check-circle'}
                ml={1}
                size={'xs'}
                transition={'none'}
                variant={'link'}
              >
                Complete all
              </Button>
            )}

            {completeTodosCount > 0 && (
              <Button
                onClick={() => dispatch(deleteCompleted())}
                leftIcon={'delete'}
                ml={1}
                size={'xs'}
                transition={'none'}
                variant={'link'}
              >
                Clear completed
              </Button>
            )}
          </Stack>
        )}

        <FilterButtons isInline spacing={2} ml={{ md: 'auto' }} />
      </Flex>
    </>
  )
}
