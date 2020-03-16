import React from 'react'
import { useDispatch } from 'react-redux'
import { addTodo } from './todosSlice'

// Components
import { Todo } from './Todo'
import { Button } from '@chakra-ui/core/dist'

export const TodoList = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Todo title={'My first Todo'} id={'312312'} completed={false} />

      <Button onClick={() => dispatch(addTodo())}>Add todo!</Button>
    </>
  )
}
