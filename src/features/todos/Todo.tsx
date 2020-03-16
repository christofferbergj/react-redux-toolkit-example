import React, { useState } from 'react'
import { TodoItem } from './todosSlice'

// Components
import { Box, Checkbox, Heading, Text } from '@chakra-ui/core/dist'

export const Todo = ({ title, id, completed }: TodoItem) => {
  const [isChecked, setIsChecked] = useState(completed)

  return (
    <Box>
      <Heading as="h3" fontSize={'sm'}>
        {title}
      </Heading>

      <Text>{id}</Text>

      <Checkbox isChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
    </Box>
  )
}
