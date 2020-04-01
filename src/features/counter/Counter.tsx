import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  decrement,
  increment,
  incrementByAmountAsync,
  incrementByAmount,
  reset,
  selectCounter,
} from './counterSlice'

// Components
import {
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/core/dist'

export const Counter = () => {
  const dispatch = useDispatch()
  const toast = useToast()

  // State selectors
  const { value, loading, error } = useSelector(selectCounter)
  const isLoading = loading === 'pending'

  // Local state
  const [incrementAmount, setIncrementAmount] = useState<number>(4)

  /**
   * Handle slider change event
   * @param {number} value
   */
  const handleSliderChange = (value: number) => setIncrementAmount(value)

  useEffect(() => {
    error && toast({ title: 'Error', description: error.message, duration: 2000, status: 'error' })
  }, [error, toast])

  return (
    <>
      <Stack spacing={{ base: 6, md: 4 }}>
        <Stack isInline spacing={4} align={'center'}>
          <Button isDisabled={isLoading} onClick={() => !!value && dispatch(decrement())}>
            -
          </Button>

          <Text as={'span'} fontSize={'2xl'} fontWeight={'medium'}>
            {value}
          </Text>

          <Button isDisabled={isLoading} onClick={() => dispatch(increment())}>
            +
          </Button>
        </Stack>

        <Flex direction={{ base: 'column', md: 'row' }}>
          <Stack isInline spacing={2}>
            <Button onClick={() => dispatch(incrementByAmount(incrementAmount))} size={'sm'}>
              Increment
            </Button>

            <Button
              isLoading={isLoading}
              onClick={() => dispatch(incrementByAmountAsync(incrementAmount))}
              size={'sm'}
            >
              Increment async
            </Button>

            <Button onClick={() => !!value && dispatch(reset())} size={'sm'}>
              Reset
            </Button>
          </Stack>

          <Slider
            color={'purple'}
            value={incrementAmount}
            max={20}
            onChange={handleSliderChange}
            flex={1}
            mt={{ base: 6, md: 0 }}
            ml={{ md: 4 }}
          >
            <SliderTrack />
            <SliderFilledTrack />
            <SliderThumb
              fontSize={'sm'}
              width={'40px'}
              height={'25px'}
              fontWeight={'medium'}
              color={'gray.800'}
              children={incrementAmount}
            />
          </Slider>
        </Flex>
      </Stack>
    </>
  )
}
