import React, { useState } from 'react'
import { Todo, toggle } from './todosSlice'

// Components
import { BoxProps, ListItem } from '@chakra-ui/core/dist'
import { useDispatch } from 'react-redux'

type Props = Todo & BoxProps

export const TodoItem = ({ desc, id, isCompleted, ...rest }: Props) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(isCompleted)

  const handleChange = (id: string) => {
    setIsChecked(!isChecked)
    dispatch(toggle(id))
  }

  return (
    <>
      <ListItem
        onChange={() => handleChange(id)}
        ml={3}
        fontSize={'lg'}
        fontWeight={'medium'}
        _hover={{ color: 'purple.600', cursor: 'pointer' }}
        _focus={{ color: 'purple.500', shadow: 'outline', outline: 'none' }}
        transition={'all 250ms'}
        tabIndex={0}
        {...rest}
      >
        {desc}
      </ListItem>
    </>
  )
}
