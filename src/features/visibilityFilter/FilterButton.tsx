import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// Filters slice
import { selectFilter, setFilter, VisibilityFilters } from './filtersSlice'

// Todos slice
import {
  selectActiveTodosCount,
  selectCompleteTodosCount,
  selectTodosCount,
} from 'features/todos/todosSlice'

// Components
import { Button, ButtonProps } from '@chakra-ui/core/dist'

type Props = {
  filter: VisibilityFilters
} & ButtonProps

export const FilterButton = memo(({ filter, children, ...rest }: Props) => {
  const dispatch = useDispatch()

  const todosCount = useSelector(selectTodosCount)
  const activeTodosCount = useSelector(selectActiveTodosCount)
  const completeTodosCount = useSelector(selectCompleteTodosCount)
  const visibilityFilter = useSelector(selectFilter)

  const activeProps = {
    bg: 'primary',
    color: 'white',
    borderColor: 'primary',
    _hover: { bg: 'purple.600' },
    _active: { bg: 'purple.700' },
  }

  const renderCount = (filter: VisibilityFilters) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todosCount
      case VisibilityFilters.SHOW_ACTIVE:
        return activeTodosCount
      case VisibilityFilters.SHOW_COMPLETED:
        return completeTodosCount
    }
  }

  const getProps = (filter: VisibilityFilters) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return {
          onClick:
            filter !== visibilityFilter
              ? () => dispatch(setFilter(VisibilityFilters.SHOW_ALL))
              : undefined,
          'aria-label': 'Filter todos',
          title: 'Filter todos',
        }

      case VisibilityFilters.SHOW_ACTIVE:
        return {
          onClick:
            filter !== visibilityFilter
              ? () => dispatch(setFilter(VisibilityFilters.SHOW_ACTIVE))
              : undefined,
          isDisabled: !activeTodosCount,
        }

      case VisibilityFilters.SHOW_COMPLETED:
        return {
          onClick:
            filter !== visibilityFilter
              ? () => dispatch(setFilter(VisibilityFilters.SHOW_COMPLETED))
              : undefined,
          isDisabled: !completeTodosCount,
        }

      default:
        throw new Error('Unknown filter')
    }
  }

  const getActiveProps = (filter: VisibilityFilters) => {
    return filter === visibilityFilter ? { ...activeProps } : null
  }

  return (
    <>
      <Button
        variant={'outline'}
        size={'xs'}
        color={'gray.500'}
        {...rest}
        {...getProps(filter)}
        {...getActiveProps(filter)}
      >
        {children} {`(${renderCount(filter)})`}
      </Button>
    </>
  )
})
