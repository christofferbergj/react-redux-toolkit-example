import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Slices
import { fetchUsers, selectUsers } from './usersSlice'
import { User } from './User'

// Components
import { Box, SimpleGrid, Skeleton } from '@chakra-ui/core/dist'

export const Users = () => {
  const dispatch = useDispatch()
  const { entities: users, loading } = useSelector(selectUsers)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  if (loading === 'pending') {
    return (
      <Box>
        {[...Array(5)].map((e, i) => (
          <Skeleton key={i} height="15px" my="10px" />
        ))}
      </Box>
    )
  }

  return (
    <>
      <SimpleGrid minChildWidth={'200px'} spacing={{ base: 2, tablet: 4 }}>
        {users.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </SimpleGrid>
    </>
  )
}
