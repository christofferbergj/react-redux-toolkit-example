import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
  reset,
  selectCount,
} from './counterSlice'

// Components
import {
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  Text,
} from '@chakra-ui/core/dist'

export const Counter = () => {
  // State selectors
  const count = useSelector(selectCount)

  // Redux dispatch
  const dispatch = useDispatch()

  // Local state
  const [incrementAmount, setIncrementAmount] = useState<number>(4)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  /**
   * Handle slider change event
   * @param {number} value
   */
  const handleSliderChange = (value: number) => setIncrementAmount(value)

  /**
   * Handle increment async
   * @returns {Promise<void>}
   */
  const handleIncrementAsync = async () => {
    setIsLoading(true)

    try {
      await dispatch(incrementAsync(incrementAmount))
    } catch (err) {
      console.log('Something happened: ', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Stack spacing={4}>
        <Stack isInline spacing={4} align={'center'}>
          <Button isDisabled={isLoading} onClick={() => !!count && dispatch(decrement())}>
            -
          </Button>

          <Text as={'span'} fontSize={'2xl'} fontWeight={'medium'}>
            {count}
          </Text>

          <Button isDisabled={isLoading} onClick={() => dispatch(increment())}>
            +
          </Button>
        </Stack>

        <Stack isInline spacing={4}>
          <Stack isInline spacing={2}>
            <Button onClick={() => dispatch(incrementByAmount(incrementAmount))} size={'sm'}>
              Increment
            </Button>

            <Button isLoading={isLoading} onClick={handleIncrementAsync} size={'sm'}>
              Increment async
            </Button>

            <Button onClick={() => !!count && dispatch(reset())} size={'sm'}>
              Reset
            </Button>
          </Stack>

          <Slider value={incrementAmount} max={20} onChange={handleSliderChange} flex={1}>
            <SliderTrack />
            <SliderFilledTrack />
            <SliderThumb
              fontSize={'sm'}
              width={'40px'}
              height={'25px'}
              fontWeight={'medium'}
              children={incrementAmount}
            />
          </Slider>
        </Stack>
      </Stack>
    </>
  )
}
