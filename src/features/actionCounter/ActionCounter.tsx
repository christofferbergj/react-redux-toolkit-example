import React from 'react'
import { useSelector } from 'react-redux'

// Slice
import { actionCounterSelector } from './actionCounterSlice'

// Components
import { Heading, HeadingProps } from '@chakra-ui/core/dist'

export const ActionCounter = ({ ...rest }: HeadingProps) => {
  const actionsCount = useSelector(actionCounterSelector)

  return (
    <>
      <Heading fontSize={'lg'} {...rest}>
        Total Redux actions: {actionsCount}
      </Heading>
    </>
  )
}
