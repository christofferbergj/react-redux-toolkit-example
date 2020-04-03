import React from 'react'

// Slice
import { VisibilityFilters } from './filtersSlice'

// Components
import { FilterButton } from './FilterButton'
import { Stack, StackProps } from '@chakra-ui/core/dist'

export const FilterButtons = ({ ...rest }: StackProps) => {
  return (
    <Stack {...rest}>
      <FilterButton filter={VisibilityFilters.SHOW_ALL}>All</FilterButton>

      <FilterButton filter={VisibilityFilters.SHOW_ACTIVE}>Active</FilterButton>

      <FilterButton filter={VisibilityFilters.SHOW_COMPLETED}>Completed</FilterButton>
    </Stack>
  )
}
