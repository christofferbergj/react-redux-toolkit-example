import React from 'react'
import { useDispatch } from 'react-redux'

// Slice
import { Todo, toggle, remove } from './todosSlice'

// Components
import { BoxProps, Button, Checkbox, ListItem } from '@chakra-ui/core/dist'

type Props = Todo & BoxProps

export const TodoItem = ({ description, id, isCompleted, ...rest }: Props) => {
  const dispatch = useDispatch()

  const handleToggleTodo = (id: string): void => {
    if (!id) return

    dispatch(toggle({ id, isCompleted }))
  }

  const handleRemoveTodo = (id: string): void => {
    if (!id) return

    dispatch(remove(id))
  }

  return (
    <>
      <ListItem
        width={'full'}
        alignItems={'center'}
        display={'flex'}
        fontSize={'lg'}
        fontWeight={'medium'}
        transition={'all 250ms'}
        {...rest}
      >
        <Checkbox onChange={() => handleToggleTodo(id)} variantColor={'purple'} size={'lg'} mr={3}>
          {description}
        </Checkbox>

        <Button onClick={() => handleRemoveTodo(id)} size={'xs'} ml={'auto'}>
          Delete
        </Button>
      </ListItem>
    </>
  )
}
