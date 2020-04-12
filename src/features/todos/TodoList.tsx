import React, { ChangeEvent, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { timestamp } from 'app/firebase'

import { selectAuth } from 'features/auth/authSlice'

// Todos slice
import { selectActiveTodosCount, selectCompleteTodosCount, Todo } from './todosSlice'

// Filters slice
import {
  VisibilityFilters,
  setFilter,
  selectFilter,
  selectVisibleTodos,
} from 'features/visibilityFilter/filtersSlice'

// Components
import { TodoItem } from './TodoItem'
import { FilterButtons } from 'features/visibilityFilter'
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormControlProps,
  Input,
  InputGroup,
  InputRightElement,
  List,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core/dist'

export const TodoList = ({ ...rest }: FormControlProps) => {
  const auth = useSelector(selectAuth)
  const firestore = useFirestore()
  const path = firestore.collection('todos')
  useFirestoreConnect({
    collection: 'todos',
    where: ['author_uid', '==', auth.uid],
    orderBy: ['createdAt', 'desc'],
  })
  const toast = useToast()
  const dispatch = useDispatch()
  const [todoDescription, setTodoDescription] = useState<string | undefined>('')
  const [updateCompletedIsLoading, setUpdateCompletedIsLoading] = useState(false)
  const [deleteCompletedIsLoading, setDeleteCompletedIsLoading] = useState(false)
  const todos: Todo[] = useSelector(selectVisibleTodos)

  // State selector
  const activeTodosCount = useSelector(selectActiveTodosCount)
  const completeTodosCount = useSelector(selectCompleteTodosCount)
  const visibilityFilter = useSelector(selectFilter)

  // Change filter depending on number of items in respective filter
  useEffect(() => {
    if (visibilityFilter === VisibilityFilters.SHOW_ACTIVE && !activeTodosCount) {
      dispatch(setFilter(VisibilityFilters.SHOW_COMPLETED))
    }

    if (visibilityFilter === VisibilityFilters.SHOW_COMPLETED && !completeTodosCount) {
      dispatch(setFilter(VisibilityFilters.SHOW_ALL))
    }
  }, [activeTodosCount, completeTodosCount, dispatch, visibilityFilter])

  /**
   * Handles adding a todo to Firestore
   * @param {React.ChangeEvent<HTMLInputElement>} event
   */
  const handleAddTodo = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    if (!todoDescription) return
    const savedDescription = todoDescription

    const todo = {
      author_uid: auth.uid,
      createdAt: timestamp(),
      description: todoDescription.trim(),
      isCompleted: false,
    }

    try {
      setTodoDescription('')
      await path.add(todo)
    } catch ({ code, message }) {
      toast({
        title: code,
        description: message,
        status: 'error',
      })

      setTodoDescription(savedDescription)
    }
  }

  /**
   * Sets isCompleted status to true of all todo items in Firestore
   * @returns {Promise<void>}
   */
  const handleUpdateCompleteStatusAll = async (shouldComplete: boolean) => {
    try {
      setUpdateCompletedIsLoading(true)

      const response = await path
        .where('author_uid', '==', auth.uid)
        .where('isCompleted', '==', !shouldComplete)
        .get()
      const WriteBatch = firestore.batch()

      response.docs.forEach((doc) => {
        const docRef = path.doc(doc.id)
        WriteBatch.update(docRef, { isCompleted: shouldComplete })
      })

      await WriteBatch.commit()
    } catch ({ code, message }) {
      toast({
        title: code,
        description: message,
        status: 'error',
      })
    } finally {
      setUpdateCompletedIsLoading(false)
    }
  }

  /**
   * Deletes all completed todos from Firestore
   * @returns {Promise<void>}
   */
  const handleDeleteCompleted = async () => {
    try {
      setDeleteCompletedIsLoading(true)

      const response = await path
        .where('author_uid', '==', auth.uid)
        .where('isCompleted', '==', true)
        .get()
      const WriteBatch = firestore.batch()

      response.docs.forEach((doc) => {
        const docRef = path.doc(doc.id)
        WriteBatch.delete(docRef)
      })

      await WriteBatch.commit()
    } catch ({ code, message }) {
      toast({
        title: code,
        description: message,
        status: 'error',
      })
    } finally {
      setDeleteCompletedIsLoading(false)
    }
  }

  if (!todos) return <Text>Loading todos..</Text>

  return (
    <>
      <FormControl as="form" onSubmit={handleAddTodo} {...rest}>
        <InputGroup size={'lg'} mt={5}>
          <Input
            onChange={({ currentTarget }: ChangeEvent<HTMLInputElement>) =>
              setTodoDescription(currentTarget.value)
            }
            _focus={{ shadow: 'outline', borderColor: 'transparent' }}
            focusBorderColor={'none'}
            placeholder={todos.length > 0 ? 'What needs to be done?' : 'Add your first todo'}
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

      <Box mt={8}>
        {todos.length > 0 && (
          <List
            as={'ul'}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'start'}
            spacing={2}
          >
            {todos.map(({ id, description, isCompleted }) => (
              <TodoItem key={id} id={id} description={description} isCompleted={isCompleted} />
            ))}
          </List>
        )}
      </Box>

      <Divider my={5} />

      <Flex width={'full'} direction={{ base: 'column', md: 'row' }} align={{ md: 'center' }}>
        <Stack isInline spacing={5} mb={{ base: 6, md: 0 }}>
          <Button
            onClick={() => handleUpdateCompleteStatusAll(true)}
            isDisabled={!activeTodosCount}
            isLoading={updateCompletedIsLoading}
            loadingText={'Saving'}
            leftIcon={'check-circle'}
            ml={1}
            size={'xs'}
            transition={'none'}
            variant={'link'}
          >
            Complete all
          </Button>

          <Button
            onClick={handleDeleteCompleted}
            isDisabled={!completeTodosCount || deleteCompletedIsLoading}
            isLoading={deleteCompletedIsLoading}
            loadingText={'Removing'}
            leftIcon={'delete'}
            ml={1}
            size={'xs'}
            transition={'none'}
            variant={'link'}
          >
            Remove completed
          </Button>
        </Stack>

        <FilterButtons isInline spacing={2} ml={{ md: 'auto' }} />
      </Flex>
    </>
  )
}
