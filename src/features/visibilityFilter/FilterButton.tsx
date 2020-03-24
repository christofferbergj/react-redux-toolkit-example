import React from 'react'
import { useDispatch } from 'react-redux'

// Slice
import { setFilter, VisibilityFilters } from './filtersSlice'

// Components
import { Button, ButtonProps } from '@chakra-ui/core/dist'

type Props = {
  filter: VisibilityFilters
  count?: number
} & ButtonProps

export const FilterButton = ({ filter, count = undefined, children, ...rest }: Props) => {
  const dispatch = useDispatch()

  const getButtonProps = (filter: VisibilityFilters) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return {
          onClick: () => dispatch(setFilter(VisibilityFilters.SHOW_ALL)),
        }

      case VisibilityFilters.SHOW_ACTIVE:
        return {
          onClick: () => dispatch(setFilter(VisibilityFilters.SHOW_ACTIVE)),
        }

      case VisibilityFilters.SHOW_COMPLETED:
        return {
          onClick: () => dispatch(setFilter(VisibilityFilters.SHOW_COMPLETED)),
        }
    }
  }

  return (
    <>
      <Button variant={'outline'} size={'xs'} {...rest} {...getButtonProps(filter)}>
        {children} {count !== undefined && `(${count})`}
      </Button>
    </>
  )
}
