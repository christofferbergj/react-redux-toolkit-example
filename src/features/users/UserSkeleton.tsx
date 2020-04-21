import React from 'react'

// Components
import { Box, Skeleton } from '@chakra-ui/core/dist'

export const UserSkeleton = () => {
  return (
    <>
      {[...Array(10)].map((e, i) => (
        <Box key={i}>
          {[...Array(5)].map((e, i) => (
            <Skeleton key={i} height="11px" mt="10px" />
          ))}
        </Box>
      ))}
    </>
  )
}
